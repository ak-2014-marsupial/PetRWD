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
