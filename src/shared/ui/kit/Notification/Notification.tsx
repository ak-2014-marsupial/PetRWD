import { useEffect, useState } from 'react';
import { notificationService, type Notification as NotificationI } from '@/shared/lib/notification/notification';
import css from './Notification.module.css';

export const NotificationContainer = () => {
    const [items, setItems] = useState<NotificationI[]>([]);

    useEffect(() => {
        // Підписуємося на зміни в сервісі
        const unsubscribe = notificationService.subscribe(setItems);
        return () => {
            unsubscribe();
        };
    }, []);

    if (items.length === 0) return null;

    const handleActionClick = (notificationId: string, callback: () => void) => {
        callback(); // Execute the action's callback
        notificationService.remove(notificationId); // Dismiss the notification
    };

    return (
        <div className={css.container}>
            {items.map(item => (
                <div key={item.id} className={`${css.toast} ${css[item.type]}`}>
                    <div className={css.message}>{item.message}</div>
                    {item.actions && item.actions.length > 0 && (
                        <div className={css.actions}>
                            {item.actions.map((action, index) => (
                                <button
                                    key={index}
                                    className={css.actionButton}
                                    onClick={() => handleActionClick(item.id, action.callback)}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <button 
                        className={css.closeBtn} 
                        onClick={() => notificationService.remove(item.id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};
