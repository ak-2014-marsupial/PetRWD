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

    return (
        <div className={css.container}>
            {items.map(item => (
                <div key={item.id} className={`${css.toast} ${css[item.type]}`}>
                    <span>{item.message}</span>
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
