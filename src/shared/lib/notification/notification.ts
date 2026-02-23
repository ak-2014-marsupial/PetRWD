export type NotificationType = 'info' | 'success' | 'error' | 'warning';

// New interface for notification actions
export interface NotificationAction {
    label: string;
    callback: () => void;
}

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
    actions?: NotificationAction[]; // Optional actions for interactive notifications
}

type Listener = (notifications: Notification[]) => void;

const listeners = new Set<Listener>();
let notifications: Notification[] = [];

const notify = () => {
    listeners.forEach(listener => listener([...notifications]));
};

export const notificationService = {
    init() {
        notifications = [];
        notify();
    },

    subscribe(listener: Listener) {
        listeners.add(listener);
        // Одразу віддаємо поточний стан при підписці
        listener([...notifications]);
        return () => {
            listeners.delete(listener);
        };
    },

    // Updated add method to accept optional actions
    add(message: string, type: NotificationType = 'info', duration = 3000, actions?: NotificationAction[]) {
        const id = crypto.randomUUID();
        const newNotification: Notification = { id, message, type, duration, actions };
        
        notifications.push(newNotification);
        notify();

        // Notification should only auto-dismiss if no actions are present and duration is > 0
        if (!actions && duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }
    },

    remove(id: string) {
        notifications = notifications.filter(n => n.id !== id);
        notify();
    },

    // Зручні методи для виклику
    success(msg: string, duration?: number, actions?: NotificationAction[]) { this.add(msg, 'success', duration, actions); },
    error(msg: string, duration?: number, actions?: NotificationAction[]) { this.add(msg, 'error', duration, actions); },
    info(msg: string, duration?: number, actions?: NotificationAction[]) { this.add(msg, 'info', duration, actions); },
    warning(msg: string, duration?: number, actions?: NotificationAction[]) { this.add(msg, 'warning', duration, actions); },
};
