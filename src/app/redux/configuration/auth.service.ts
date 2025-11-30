import { signInWithEmailAndPassword, signOut, initializeAuth, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { logoutUser, setUser } from "../slice/user";
import { store } from "../store";
import Toast from 'react-native-toast-message';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { LocationState, UserType } from "../../constants/TypesAndInerface";



const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        date
    ).padStart(2, "0")}`;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return {
        year,
        month,
        date,
        time: formattedTime,
        formattedDateTime: `${formattedDate} ${formattedTime}`,
    };
};

export class AuthService {

    private createOnboardingNotification() {
        return {
            id: Date.now(),
            title: "Complete Your Onboarding",
            message:
                "Please complete your staff onboarding information to access all features.",
            type: "warning",
            date: new Date().toISOString().split("T")[0],
            time: new Date().toISOString(),
            isRead: false,
        };
    }

    async handleUserRegistration(
        userData: UserType,
        locationData: LocationState
    ) {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );
            const user = res.user;
            const currentDateTime = getCurrentDateTime();

            await updateProfile(user, {
                displayName: `${userData.firstName} ${userData.lastName}`,
            });

            const userDocRef = doc(collection(db, "droidaccount"), user.uid);

            // Check if this is a staff account to create onboarding notification
            const isStaff =
                userData.userType?.toLowerCase() === "staff" ||
                userData.userType?.toLowerCase() === "admin";

            const droidAccount = {
                user: {
                    primaryInformation: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        initials:
                            `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase(),
                        userType: userData.userType,
                        staffId: userData.uniqueId,
                        uniqueId: user.uid,
                        email: userData.email,
                        agreeToPolicy: userData.agreeToPolicy,
                        isLoggedIn: true,
                        agreedToTerms: true,
                        middleName: "",
                        phone: "",
                        gender: "",
                        dateOfBirth: "",
                        disability: false,
                        disabilityType: "",
                        photoUrl: "",
                        educationalLevel: "",
                        referralName: "",
                        secondaryEmail: "",
                        securityQuestion: "",
                        securityAnswer: "",
                        verifiedEmail: false,
                        verifyPhoneNumber: false,
                        twoFactorSettings: false,
                        password: "",
                        role: "",
                        streetNumber: "",
                        streetName: "",
                        city: "",
                        state: "",
                        country: "",
                    },
                    location: {
                        locationFromDevice: locationData,
                        currentdateTime: currentDateTime,
                    },
                    security: {},
                    affiliates: {
                        knowledgeCity: {
                            user: false,
                        },
                        nerves: {
                            user: false,
                        },
                        muzik: {
                            user: false,
                        },
                    },
                    onboard: {
                        onboarding: [],
                        memberStatus: {},
                        trainings: [],
                        progressions: {},
                        userForms: [],
                        notifications: isStaff ? [this.createOnboardingNotification()] : [], // AUTO-CREATE FOR STAFF
                    },
                    staff: {
                        paySlip: [],
                        staffDetails: {},
                        staffDoc: {},
                        staffLeave: [],
                        staffSignInAndOut: [],
                        tasks: [],
                        tests: [],
                    },
                },
                toolBox: {
                    toolBoxInfo: [],
                },
                calculate: {
                    calculators: [],
                },
                schedules: {
                    mySchedles: [],
                },
            };

            await setDoc(userDocRef, droidAccount);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                const fetchedUserData = userSnapshot.data();
                const primaryInformation = fetchedUserData.user.primaryInformation;

                store.dispatch(setUser({ ...primaryInformation }));

                await sendEmailVerification(user);
                await signOut(auth);
                Toast.show({
                    type: 'success', // Uses the library's predefined success styling (which is usually green)
                    text1: 'Login Successful', // A title for the toast
                    text2: "Your D'roid Account has been successfully created", // The main message
                    // You typically don't pass raw style objects like background/color here, 
                    // as the library handles it for the 'success' type.
                });

                return { success: true };
            } else {
                Toast.show({
                    type: 'error', // Uses the library's predefined error styling (usually red)
                    text1: 'Failed', // A concise title
                    text2: "User Information does not exist 🚫", // The detailed error message
                });
                return null;
            }
        } catch (error: any) {
            console.error("Error during registration:", error);
            Toast.show({
                type: 'error', // Uses the library's predefined error styling (usually red)
                text1: 'Failed', // A concise title
                text2: error.message || "Error creating your D'roid Account 🚫", // The detailed error message
            });
            return null;
        }
    }

    async handleUserLogin(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userDocRef = doc(
                collection(db, "droidaccount"),
                userCredential.user.uid
            );
            const userDocSnap = await getDoc(userDocRef);
            const updatedData = userDocSnap.data();

            if (userDocSnap.exists()) {
                const fetchedUserData = userDocSnap.data();
                const primaryInformation = fetchedUserData.user?.primaryInformation;
                const userForm = fetchedUserData.user?.userForms;
                const userType = primaryInformation?.userType;

                // FIXED: Case-insensitive staff detection
                const isUserActuallyStaff =
                    userType?.toLowerCase() === "staff" ||
                    userType?.toLowerCase() === "admin";

                // if (isUserActuallyStaff !== isStaff) {
                //     await auth.signOut();
                //     throw new Error(
                //         isStaff
                //             ? "This account is not a staff account. Please use the member login."
                //             : "Staff accounts must log in through the Staff Login portal."
                //     );
                // }

                // const updatedEntries =
                //   updatedData?.user?.staff?.staffSignInAndOut || [];
                // const updatedStaffDetails = {
                //   staffGrossPay:
                //     updatedData?.user?.staff?.staffDetails?.staffGrossPay || "",
                //   staffTax: updatedData?.user?.staff?.staffDetails?.staffTax || "",
                //   staffPosition:
                //     updatedData?.user?.staff?.staffDetails?.staffPosition || "",
                //   staffBank: updatedData?.user?.staff?.staffDetails?.staffBank || "",
                //   staffAccountNmber:
                //     updatedData?.user?.staff?.staffDetails?.staffAccountNmber || "",
                //   staffAccountName:
                //     updatedData?.user?.staff?.staffDetails?.staffAccountName || "",
                //   staffStartDate:
                //     updatedData?.user?.staff?.staffDetails?.staffStartDate || "",
                // };
                // const updatedStaffDocuments = updatedData?.user?.staff?.staffDoc || {};
                // const updatedStaffLeave = updatedData?.user?.staff?.staffLeave || [];
                // const updatedKnowledgeCity = updatedData?.user?.knowledgeCity || {};
                // const updatedOnboarding = updatedData?.user?.onboard?.onboarding || [];
                // const updatedMemberStatus =
                //   updatedData?.user?.onboard?.memberStatus || [];
                // const updatedTrainings = updatedData?.user?.trainings || [];
                // const updatedPayslips = updatedData?.user?.payslips?.paySlip || [];
                // const updatedProgressions = updatedData?.user?.progressions || [];
                // const schedleData = updatedData?.schedules?.mySchedules || [];
                // const toolBoxData = updatedData?.toolBox?.toolBoxInfo || [];
                // const calculateData = updatedData?.calculate?.calculators || [];

                // FIXED: Get notifications from correct path
                const firestoreNotifications =
                    fetchedUserData.user?.onboard?.notifications || [];

                // Update all Redux states
                // store.dispatch(setPayslipData(updatedPayslips));
                // store.dispatch(setKnowledgeCity(updatedKnowledgeCity));
                // store.dispatch(setTrainings(updatedTrainings));
                // store.dispatch(setAllMilestones(updatedProgressions));
                // store.dispatch(setSignInAndOutData(updatedEntries));
                // store.dispatch(setStaffDetails(updatedStaffDetails));

                // Set notifications from Firestore to Redux
                // store.dispatch(setNotifications(firestoreNotifications));

                // try {
                //   const { setStaffInfo } = await import("../slices/onboarding");
                //   store.dispatch(setStaffInfo(updatedStaffDetails));
                // } catch (_) {}

                // store.dispatch(setStaffDocuments(updatedStaffDocuments));
                // store.dispatch(setToolBox(toolBoxData));
                // store.dispatch(setCalculate(calculateData));
                // store.dispatch(setSchedules(schedleData));
                // store.dispatch(setStaffLeave(updatedStaffLeave));
                store.dispatch(
                    setUser({ ...primaryInformation, role: primaryInformation.role })
                );

                // Initialize notification service AFTER setting Firestore data
                // try {
                //   const { notificationsService } = await import(
                //     "../../ui/notificationService/notifications.service"
                //   );
                //   await notificationsService.initializeNotifications();
                // } catch (error) {
                //   console.error("Failed to initialize notifications:", error);
                // }

                Toast.show({
                    type: 'success', // Uses the library's predefined success styling (which is usually green)
                    text1: 'Login Successful', // A title for the toast
                    text2: 'We have successfully logged you into your account.', // The main message
                    // You typically don't pass raw style objects like background/color here, 
                    // as the library handles it for the 'success' type.
                });

                return userCredential;
            } else {
                throw new Error("User information does not exist in database.");
            }
        } catch (err: any) {
            Toast.show({
                type: 'error', // Uses the library's predefined error styling (usually red)
                text1: 'Login Failed', // A concise title
                text2: err.message || "Login failed", // The detailed error message
            });
            throw err;
        }
    }
    async handleUserSignout(): Promise<void> {
        await signOut(auth)
            .then(() => {
                store.dispatch(logoutUser());

                // Success Toast using the react-native-toast-message style
                Toast.show({
                    type: 'success',
                    text1: 'Sign Out Successful',
                    text2: `You have successfully signed out of your D'roid Account`,
                });
            })
            .catch((err) => {
                // Error Toast using the react-native-toast-message style
                Toast.show({
                    type: 'error',
                    text1: 'Sign Out Failed',
                    text2: err.message || `An error occurred while signing out.`,
                });
            });
    }
}

export const authService = new AuthService();