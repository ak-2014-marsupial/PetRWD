export type NotificationType = 'info' | 'success' | 'error' | 'warning';

export interface Notification {
    id: string;
    message: string;
    type: NotificationType;
    duration?: number;
}

type Listener = (notifications: Notification[]) => void;

const listeners = new Set<Listener>();
let notifications: Notification[] = [];

const notify = () => {
    listeners.forEach(listener => listener([...notifications]));
};

export const notificationService = {
    subscribe(listener: Listener) {
        listeners.add(listener);
        // Одразу віддаємо поточний стан при підписці
        listener([...notifications]);
        return () => {
            listeners.delete(listener);
        };
    },

    add(message: string, type: NotificationType = 'info', duration = 3000) {
        const id = crypto.randomUUID();
        const newNotification: Notification = { id, message, type, duration };
        
        notifications.push(newNotification);
        notify();

        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }
    },

    remove(id: string) {
        notifications = notifications.filter(n => n.id !== id);
        notify();
    },

    // Зручні методи для виклику
    success(msg: string, duration?: number) { this.add(msg, 'success', duration); },
    error(msg: string, duration?: number) { this.add(msg, 'error', duration); },
    info(msg: string, duration?: number) { this.add(msg, 'info', duration); },
    warning(msg: string, duration?: number) { this.add(msg, 'warning', duration); },
};
