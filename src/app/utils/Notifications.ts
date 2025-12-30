import { AppDispatch } from "../redux/store";
import { addNotification } from "../redux/slice/notifications";
import type { NotificationItem } from "../redux/slice/notifications";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { auth, db } from "../../firebase";

// Reusable function to add notification to Firebase
async function addNotificationToFirebase(notification: NotificationItem) {
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
        ) as NotificationItem;

        if (!userSnapshot.exists()) {
            await setDoc(
                userDocRef,
                { user: { onboard: { notifications: [sanitizedNotification] } } },
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

// Modified function
export const createAndDispatchNotification = async (
    dispatch: AppDispatch,
    params: {
        title: string;
        message: string;
        isRead?: boolean;
    }
) => {
    const now = new Date();

    const notification: NotificationItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: params.title,
        message: params.message,
        date: now.toLocaleDateString("en-GB"), // DD/MM/YYYY
        time: now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        isRead: params.isRead ?? false,
    };

    // Add to Firebase first
    const addedNotification = await addNotificationToFirebase(notification);

    if (addedNotification) {
        // Only dispatch to Redux if Firestore add succeeded
        dispatch(addNotification(addedNotification));
    }
};
