import { signInWithEmailAndPassword, signOut, initializeAuth, sendEmailVerification, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { logoutUser, setUser } from "../slice/user";
import { store } from "../store";
import Toast from 'react-native-toast-message';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { LocationState, UserType } from "../../constants/TypesAndInerface";
import { setEvents } from "../slice/eventSlice";
import { setConnectedApps } from "../slice/affiliatedAppsSlice";
import { NotificationItem, persistNotifications, setNotifications } from "../slice/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setTier } from "../slice/membershiptierslice";



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

const registrationTime = new Date();

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
                        notifications: [
                            {
                                id: "0",
                                title: "Welcome to D'roid One",
                                message: "We're excited to have you onboard! Explore features and get started.",
                                date: registrationTime.toLocaleDateString("en-GB"),
                                time: registrationTime.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }), // HH:MM
                                isRead: false,
                            },
                            {
                                id: "1",
                                title: "Complete Your Personal Details",
                                message: "Please complete your personal details and finish onboarding if necessary.",
                                date: registrationTime.toLocaleDateString("en-GB"),
                                time: registrationTime.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }),
                                isRead: false,
                            },

                        ],
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
                    text2: "Your D'roid Account has been successfully created",
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

                const isUserActuallyStaff =
                    userType?.toLowerCase() === "staff" ||
                    userType?.toLowerCase() === "admin";

                const schedleData = fetchedUserData?.schedules?.mySchedles || [];;
                const progress = fetchedUserData?.user?.onboard?.progress || {};
                const firestoreNotificationsRaw =
                    fetchedUserData.user?.onboard?.notifications || [];
                // console.log(firestoreNotifications)
                const firestoreNotifications: NotificationItem[] =
                    firestoreNotificationsRaw.map((n: any, index: number) => ({
                        id: n.id ?? `firebase-${index}`,
                        title: n.title ?? "Notification",
                        message: n.message ?? "",
                        date: n.date,
                        time: n.time,
                        isRead: n.isRead ?? false,
                    }));

                store.dispatch(setTier(progress));;
                store.dispatch(setNotifications(firestoreNotifications));
                store.dispatch(persistNotifications(firestoreNotifications));
                store.dispatch(setEvents(schedleData))
                store.dispatch(
                    setUser({ ...primaryInformation, role: primaryInformation.role })
                );

                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'We have successfully logged you into your account.',
                });

                return userCredential;
            } else {
                throw new Error("User information does not exist in database.");
            }
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: err.message || "Login failed",
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
    async addScheduleToFirebase(schedule: any) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                Toast.show({
                    type: "error",
                    text1: "Failed to Add Schedule",
                    text2: "No authenticated user found",
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            // Remove undefined fields
            const sanitizedSchedule = Object.fromEntries(
                Object.entries(schedule).filter(([_, v]) => v !== undefined)
            );

            if (!userSnapshot.exists()) {
                await setDoc(
                    userDocRef,
                    { schedules: { mySchedles: [sanitizedSchedule] } },
                    { merge: true }
                );
            } else {
                const existingSchedules = userSnapshot.data()?.schedules?.mySchedles || [];
                const duplicate = existingSchedules.some((s: any) => s.id === sanitizedSchedule.id);

                if (duplicate) {
                    Toast.show({
                        type: "error",
                        text1: "Failed to Add Schedule",
                        text2: "This schedule already exists.",
                    });
                    return null;
                }

                await updateDoc(userDocRef, {
                    "schedules.mySchedles": arrayUnion(sanitizedSchedule),
                });
            }

            // Update Redux state
            const updatedSnapshot = await getDoc(userDocRef);
            const updatedSchedules = updatedSnapshot.data()?.schedules?.mySchedles || [];
            store.dispatch(setEvents(updatedSchedules));

            Toast.show({
                type: "success",
                text1: "Schedule Added",
                text2: "Your schedule has been successfully added.",
            });

            return sanitizedSchedule;
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed to Add Schedule",
                text2: error.message || "Error adding schedule",
            });
            console.error("Error adding schedule: ", error);
            return null;
        }
    }
    async updateScheduleInFirebase(updatedSchedule: any) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                Toast.show({
                    type: "error",
                    text1: "Failed to Update Schedule",
                    text2: "No authenticated user found",
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                Toast.show({
                    type: "error",
                    text1: "Update Failed",
                    text2: "User data not found.",
                });
                return null;
            }

            // Remove undefined fields
            const sanitizedSchedule = Object.fromEntries(
                Object.entries(updatedSchedule).filter(([_, v]) => v !== undefined)
            );

            const existingSchedules = userSnapshot.data()?.schedules?.mySchedles || [];

            // Remove old schedule
            const oldSchedule = existingSchedules.find((s: any) => s.id === sanitizedSchedule.id);

            if (!oldSchedule) {
                Toast.show({
                    type: "error",
                    text1: "Update Failed",
                    text2: "Schedule not found.",
                });
                return null;
            }

            await updateDoc(userDocRef, {
                "schedules.mySchedles": arrayRemove(oldSchedule),
            });

            // Add updated schedule
            await updateDoc(userDocRef, {
                "schedules.mySchedles": arrayUnion(sanitizedSchedule),
            });

            // Refresh Redux store
            const updatedSnapshot = await getDoc(userDocRef);
            const finalSchedules = updatedSnapshot.data()?.schedules?.mySchedles || [];
            store.dispatch(setEvents(finalSchedules));

            Toast.show({
                type: "success",
                text1: "Schedule Updated",
                text2: "Your schedule has been successfully updated.",
            });

            return sanitizedSchedule;
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed to Update Schedule",
                text2: error.message || "Error updating schedule",
            });
            console.error("Error updating schedule: ", error);
            return null;
        }
    }
    async deleteScheduleFromFirebase(scheduleId: string) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                Toast.show({
                    type: "error",
                    text1: "Failed to Delete Schedule",
                    text2: "No authenticated user found",
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                Toast.show({
                    type: "error",
                    text1: "Delete Failed",
                    text2: "User data not found.",
                });
                return null;
            }

            const existingSchedules = userSnapshot.data()?.schedules?.mySchedles || [];

            const newSchedules = existingSchedules.filter(
                (s: any) => s.id !== scheduleId
            );

            await updateDoc(userDocRef, {
                "schedules.mySchedles": newSchedules,
            });

            // refresh redux
            store.dispatch(setEvents(newSchedules));

            Toast.show({
                type: "success",
                text1: "Schedule Deleted",
                text2: "Your schedule has been deleted.",
            });

            return true;
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Delete Failed",
                text2: error.message || "Error deleting schedule",
            });
            console.error("Error deleting schedule: ", error);
            return null;
        }
    }
    async getCurrentUser(): Promise<any> {
        //   console.log("authService.getCurrentUser() called…");

        return new Promise((resolve, reject) => {
            try {
                const unsubscribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        //   console.log("onAuthStateChanged fired. User =", user);

                        unsubscribe();

                        if (user) {
                            // console.log("User authenticated. UID:", user.uid);
                            resolve(user);
                        } else {
                            // console.log("No authenticated user found!");
                            reject(new Error("User not authenticated"));
                        }
                    },
                    (error) => {
                        //   console.log("onAuthStateChanged ERROR:", error);
                        reject(error);
                    }
                );
            } catch (err) {
                //   console.log("getCurrentUser() unexpected error:", err);
                reject(err);
            }
        });
    }
    async updatePrimaryInformation(formData: any) {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                throw new Error("No authenticated user found.");
            }

            const userDocRef = doc(db, "droidaccount", currentUser.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                throw new Error("User profile not found in the database.");
            }

            const existingData = userSnapshot.data();

            // Build update payload while preserving Firestore structure
            const updatedPrimaryInfo = {
                ...existingData.user.primaryInformation,
                ...formData,
                initials: `${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`.toUpperCase(),
                updatedAt: new Date().toISOString(),
            };

            // Update Firestore
            await updateDoc(userDocRef, {
                "user.primaryInformation": updatedPrimaryInfo,
            });

            // Save to local storage
            await ReactNativeAsyncStorage.setItem(
                "profileUpdated",
                JSON.stringify(updatedPrimaryInfo)
            );

            // Display success toast
            Toast.show({
                type: "success",
                text1: "Profile Updated",
                text2: "Your personal details have been successfully saved.",
            });

            return { success: true, data: updatedPrimaryInfo };

        } catch (error: any) {
            console.error("Error updating profile:", error);

            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: error.message || "Unable to update profile information.",
            });

            return { success: false, error: error.message };
        }
    }
    async updateAffiliatesData(
        partialAffiliates: {
            knowledgeCity?: { user: boolean };
            nerves?: { user: boolean };
            muzik?: { user: boolean };
        }
    ) {
        try {
            const currentUser = await this.getCurrentUser();
            const userId = currentUser.uid;

            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                Toast.show({
                    type: "error",
                    text1: "Update Failed",
                    text2: "User record not found.",
                });
                return null;
            }

            const currentData = userSnapshot.data();
            const currentAffiliates = currentData?.user?.affiliates || {};

            // Merge the updates with existing data
            const updatedAffiliates = {
                knowledgeCity: {
                    ...currentAffiliates.knowledgeCity,
                    ...partialAffiliates.knowledgeCity,
                },
                nerves: {
                    ...currentAffiliates.nerves,
                    ...partialAffiliates.nerves,
                },
                muzik: {
                    ...currentAffiliates.muzik,
                    ...partialAffiliates.muzik,
                },
            };

            // 🔥 Firestore update (single source of truth)
            await updateDoc(userDocRef, {
                "user.affiliates": updatedAffiliates,
            });

            // ✅ Transform to Redux format (flat boolean structure)
            const reduxFormat = {
                knowledgeCity: updatedAffiliates.knowledgeCity?.user || false,
                nerves: updatedAffiliates.nerves?.user || false,
                muzik: updatedAffiliates.muzik?.user || false,
            };

            // Sync Redux (projection only)
            store.dispatch(setConnectedApps(reduxFormat));

            // 🎉 UX feedback
            Toast.show({
                type: "success",
                text1: "Apps Updated",
                text2: "Your affiliated apps were updated successfully.",
            });

            return updatedAffiliates;
        } catch (error: any) {
            console.error("Affiliate update error:", error);

            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: error.message || "Unable to update affiliated apps.",
            });

            throw error;
        }
    }
    async handleForgotPassword(email: string) {
        try {
            if (!email || email.trim() === "") {
                Toast.show({
                    type: "error",
                    text1: "Missing Email",
                    text2: "Please enter your email address.",
                });
                return;
            }

            await sendPasswordResetEmail(auth, email);

            Toast.show({
                type: "success",
                text1: "Password Reset Sent",
                text2: "Check your email and spam folder for reset instructions.",
            });

            return true;
        } catch (error: any) {
            console.error("Forgot Password Error:", error);

            let message = "Something went wrong.";

            if (error.code === "auth/user-not-found") {
                message = "No account found with this email.";
            }
            if (error.code === "auth/invalid-email") {
                message = "Email format is invalid.";
            }

            Toast.show({
                type: "error",
                text1: "Reset Failed",
                text2: message,
            });

            return null;
        }
    }
    async addNotificationToFirebase(notification: any) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                Toast.show({
                    type: "error",
                    text1: "Failed to Add Notification",
                    text2: "No authenticated user found",
                });
                return null;
            }

            const userId = currentUser.uid;
            const userDocRef = doc(db, "droidaccount", userId);
            const userSnapshot = await getDoc(userDocRef);

            // Remove undefined fields
            const sanitizedNotification = Object.fromEntries(
                Object.entries(notification).filter(([_, v]) => v !== undefined)
            );

            if (!userSnapshot.exists()) {
                await setDoc(
                    userDocRef,
                    {
                        user: {
                            onboard: { notifications: [sanitizedNotification] }
                        }
                    },
                    { merge: true }
                );
            } else {
                const existingNotifications = userSnapshot.data()?.user?.onboard?.notifications || [];
                const duplicate = existingNotifications.some((n: any) => n.id === sanitizedNotification.id);

                if (duplicate) {
                    Toast.show({
                        type: "error",
                        text1: "Failed to Add Notification",
                        text2: "This notification already exists.",
                    });
                    return null;
                }

                await updateDoc(userDocRef, {
                    "user.onboard.notifications": arrayUnion(sanitizedNotification),
                });
            }

            // Optionally update Redux state if you have a notification slice
            // const updatedSnapshot = await getDoc(userDocRef);
            // const updatedNotifications = updatedSnapshot.data()?.user?.onboard?.notifications || [];
            // store.dispatch(setNotifications(updatedNotifications));

            Toast.show({
                type: "success",
                text1: "Notification Added",
                text2: "Your notification has been successfully added.",
            });

            return sanitizedNotification;
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Failed to Add Notification",
                text2: error.message || "Error adding notification",
            });
            console.error("Error adding notification: ", error);
            return null;
        }
    }
    async pullNotificationsFromFirebase() {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return null;

            const userDocRef = doc(db, "droidaccount", currentUser.uid);
            const userSnapshot = await getDoc(userDocRef);

            const rawNotifications =
                userSnapshot.exists()
                    ? userSnapshot.data()?.user?.onboard?.notifications || []
                    : [];

            const notifications: NotificationItem[] = rawNotifications
                .map((n: any) =>
                    n?.id && n?.message
                        ? {
                            id: String(n.id),
                            title: n.title ?? undefined,
                            message: String(n.message),
                            date: n.date ?? undefined,
                            time: n.time ?? undefined,
                            isRead: Boolean(n.isRead),
                        }
                        : null
                )
                .filter(Boolean) as NotificationItem[];

            // 🔄 Redux
            store.dispatch(setNotifications(notifications));

            // 💾 AsyncStorage (IMPORTANT)
            await AsyncStorage.setItem(
                "notifications",
                JSON.stringify(notifications)
            );

            return notifications;
        } catch (error) {
            console.error("Error pulling notifications:", error);
            return null;
        }
    }
    async markNotificationAsReadInFirebase(notificationId: string) {
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) return null;

            const userDocRef = doc(db, "droidaccount", currentUser.uid);
            const userSnapshot = await getDoc(userDocRef);
            if (!userSnapshot.exists()) return null;

            const rawNotifications =
                userSnapshot.data()?.user?.onboard?.notifications || [];

            let updated = false;

            const updatedNotifications: NotificationItem[] = rawNotifications.map(
                (n: any) => {
                    if (n?.id === notificationId && !n.isRead) {
                        updated = true;
                        return { ...n, isRead: true };
                    }
                    return n;
                }
            );

            if (!updated) return null;

            // 🔄 Firestore
            await updateDoc(userDocRef, {
                "user.onboard.notifications": updatedNotifications,
            });

            // 🔄 Redux
            store.dispatch(setNotifications(updatedNotifications));

            // 💾 AsyncStorage
            await AsyncStorage.setItem(
                "notifications",
                JSON.stringify(updatedNotifications)
            );

            return true;
        } catch (error) {
            console.error("Error marking notification as read:", error);
            return null;
        }
    }
    async updateProgressionInformation(progressData: any) {
        try {
            const currentUser = auth.currentUser;

            if (!currentUser) {
                throw new Error("No authenticated user found.");
            }

            const userDocRef = doc(db, "droidaccount", currentUser.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                throw new Error("User profile not found in the database.");
            }

            const existingData = userSnapshot.data();

            // Build update payload while preserving Firestore structure
            const updatedProgress = {
                ...existingData.user?.onboard?.progress,
                ...progressData,
                updatedAt: new Date().toLocaleString(),
            };

            // 🔄 Update Firestore
            await updateDoc(userDocRef, {
                "user.onboard.progress": updatedProgress,
            });

            // // 💾 Save to local storage
            // await ReactNativeAsyncStorage.setItem(
            //     "progressUpdated",
            //     JSON.stringify(updatedProgress)
            // );

            // ✅ Success feedback
            Toast.show({
                type: "success",
                text1: "Progress Updated",
                text2: "Your progression information has been successfully updated.",
            });

            return { success: true, data: updatedProgress };

        } catch (error: any) {
            console.error("Error updating progression:", error);

            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: error.message || "Unable to update progression information.",
            });

            return { success: false, error: error.message };
        }
    }

}

export const authService = new AuthService();