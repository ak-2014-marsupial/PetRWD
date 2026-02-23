# Система повідомлень (Notifications)

У проекті реалізована централізована система сповіщень (Toast), побудована на патерні **Observer**. Це дозволяє викликати повідомлення з будь-якої частини коду (компоненти, сервіси, утиліти).

## Архітектура
1. **`notificationService`**: Логіка черги повідомлень та методи керування.
2. **`NotificationContainer`**: UI-компонент, що відображає активні повідомлення.
3. **`init()`**: Метод ініціалізації сервісу при старті додатка.

## API Сервісу

Імпортуйте сервіс із загальної бібліотеки:
```typescript
import { notificationService } from '@/shared/lib';
```

### Основні методи:
- `notificationService.success(message, duration?)` — Зелене повідомлення про успіх.
- `notificationService.error(message, duration?)` — Червоне повідомлення про помилку.
- `notificationService.info(message, duration?)` — Блакитне інформаційне повідомлення.
- `notificationService.warning(message, duration?)` — Помаранчеве повідомлення про попередження.

*`duration` за замовчуванням складає **3000 мс**. Передайте `0`, щоб повідомлення не зникало автоматично.*

## Приклади використання

### 1. У React-компоненті
```tsx
import { notificationService } from '@/shared/lib';

export const MyComponent = () => {
    const handleSave = async () => {
        try {
            await saveData();
            notificationService.success('Дані успішно збережено!');
        } catch (e) {
            notificationService.error('Помилка при збереженні');
        }
    };

    return <button onClick={handleSave}>Зберегти</button>;
};
```

### 2. У звичайному сервісі чи функції
```typescript
import { notificationService } from '@/shared/lib';

export const checkAuth = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
        notificationService.warning('Будь ласка, спочатку авторизуйтесь');
    }
};
```

## Налаштування в App.tsx
Сервіс автоматично підключений у корені додатка:
- Контейнер `<NotificationContainer />` доданий у JSX.
- Виклик `notificationService.init()` доданий у блок ініціалізації сервісів.

---

## Інтерактивні повідомлення з кнопками дії

Для додавання кнопок використовуйте новий параметр `actions` у методі `add` або відповідних хелперах (наприклад, `notificationService.warning`). Цей параметр приймає масив об'єктів `{ label: string; callback: () => void; }`.

**Важливо:** Якщо повідомлення містить `actions`, воно **не буде зникати автоматично**, доки користувач не натисне на одну з кнопок або не закриє його вручну.

### Приклад використання (Підтвердження очистки LocalStorage)

```tsx
import { notificationService } from '@/shared/lib';

export const ClearStorageButton = ({ label }: { label?: string }) => {
    const handleClear = () => {
        notificationService.warning(
            "Ви впевнені, що хочете очистити ВСІ локальні налаштування? Цю дію не можна скасувати.",
            0, // Duration 0, щоб повідомлення не зникало автоматично
            [
                {
                    label: "Так, очистити",
                    callback: () => {
                        localStorage.clear();
                        notificationService.success("Усі локальні налаштування очищено!", 1500);
                        // Після очищення часто потрібно перезавантажити сторінку
                        setTimeout(() => window.location.reload(), 500); 
                    },
                },
                {
                    label: "Ні, залишити",
                    callback: () => {
                        notificationService.info("Дію скасовано.", 1500);
                    },
                },
            ]
        );
    };

    return (
        <button onClick={handleClear}>
            {label || 'Очистити кеш'}
        </button>
    );
};
```
