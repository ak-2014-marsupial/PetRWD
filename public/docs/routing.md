# Детальна Реалізація Маршрутизації

Цей документ описує, як влаштована система маршрутизації (роутингу) та навігації в проєкті.

## Основний Принцип: Єдине Джерело Правди

Ключова ідея полягає в тому, щоб мати єдиний конфігураційний файл, який визначає всі доступні маршрути в додатку. Цей файл є "єдиним джерелом правди" для всього, що пов'язано з навігацією.

Таким файлом є `src/app/config/routerConfig.tsx`.

## Структура `routerConfig.tsx`

Файл експортує об'єкт, де ключами є назви маршрутів (у форматі `enum`), а значеннями — об'єкти, що описують кожен маршрут.

**Приклад об'єкта маршруту:**
```typescript
import { RouteProps } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { DocPage } from '@/pages/Doc';

export enum AppRoutes {
    HOME = 'home',
    ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.ABOUT]: '/Doc',
};

export const routerConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <DocPage />,
        // Можна додавати й інші властивості, наприклад, для захищених маршрутів:
        // authOnly: true, 
    },
};
```

## Використання Конфігурації

Цей єдиний об'єкт `routerConfig` використовується у двох ключових місцях:

### 1. Генерація Маршрутів в `AppRouter`
Компонент `AppRouter` (`src/app/providers/router/AppRouter.tsx`) імпортує `routerConfig`, ітерується по його значеннях (`Object.values(routerConfig)`) і створює відповідний набір компонентів `<Route>` з `react-router-dom`.

```tsx
// Усередині AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import { routerConfig } from '@/app/config/routerConfig';

const AppRouter = () => (
    <Routes>
        {Object.values(routerConfig).map(({ path, element }) => (
            <Route
                key={path}
                path={path}
                element={element}
            />
        ))}
    </Routes>
);
```
Це гарантує, що всі визначені маршрути автоматично стають доступними в додатку.

### 2. Побудова Навігації в `Sidebar`
Віджет `Sidebar` (`src/widgets/app-shell/ui/Sidebar.tsx`) також використовує `routerConfig` для динамічної побудови навігаційних посилань.

Він може ітеруватися по конфігурації та рендерити компонент `<NavLink>` для кожного маршруту, який повинен бути видимим у навігації. Це виключає розсинхронізацію між фактичними маршрутами та посиланнями, що на них ведуть.

## Як Додати Нову Сторінку

1.  **Створіть компонент сторінки** (наприклад, `src/pages/contact/ui/ContactPage.tsx`).
2.  **Відкрийте `routerConfig.tsx`**.
3.  **Додайте новий запис** в `enum AppRoutes` (наприклад, `CONTACT = 'contact'`).
4.  **Додайте шлях** в об'єкт `RoutePath` (наприклад, `[AppRoutes.CONTACT]: '/contact'`).
5.  **Додайте новий об'єкт** в `routerConfig`, вказавши `path` та `element` для нової сторінки.

Все! Нова сторінка автоматично зареєструється в системі маршрутизації та, за відповідної логіки в `Sidebar`, з'явиться в навігації.