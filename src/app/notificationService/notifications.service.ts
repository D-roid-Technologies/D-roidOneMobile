import { store } from "../redux/store";
import { addNotification, NotificationItem, persistNotifications } from "../redux/slice/notifications";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const enhancedNotifications = {
  addSilent: async (notification: Omit<NotificationItem, "id">) => {
    const newNotification: NotificationItem = {
      id: generateId(),
      ...notification,
    };

    // Dispatch to Redux store to update UI immediately
    store.dispatch(addNotification(newNotification));

    // Get updated state to persist
    const state = store.getState();
    const currentNotifications = state.notifications.notifications;

    // Persist to storage
    await store.dispatch(persistNotifications(currentNotifications));
  },
};
