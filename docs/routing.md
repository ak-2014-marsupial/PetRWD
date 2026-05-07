# Система Маршрутизації та Навігації

Конфігурація маршрутів знаходиться в `src/app/config/routerConfig.tsx`. Вона визначає не тільки шлях (URL) і компонент сторінки, але й метадані для побудови навігації: іконки, назви, секції та типи відображення.

## Типи Маршрутів (`RouteType`)

В системі розділені два основні типи елементів:
- **`LINK`**: Класичний маршрут з `path`. Він реєструється в `AppRouter` і відображається як посилання в сайдбарі.
- **`COMPONENT`**: Спеціальний елемент (наприклад, перемикач теми або вибір розміру шрифту), який відображається в сайдбарі, але не має власного URL-шляху.

## Структура `AppRoute`

Кожен об'єкт маршруту має наступні властивості:
```typescript
export interface AppRoute {
    id: string;               // Унікальний ідентифікатор
    type: RouteTypeValues;    // LINK або COMPONENT
    isNav: boolean;           // Чи відображати як основне посилання (NavLink)
    section: 'main' | 'settings'; // Секція в сайдбарі для групування
    element: ReactNode | ((props: { label?: string }) => ReactNode); // Компонент або функція-рендерер
    path?: string;            // URL-шлях (обов'язково для LINK)
    label?: string;           // Текст для відображення
    icon?: ReactNode;         // Іконка
}
```

## Функції-рендерери в `element`

 Це дозволяє передавати дані з конфігурації (наприклад, `label`) безпосередньо в компонент:

```tsx
{
    id: 'theme-color-editor-toggle',
    label: "Color Editor",
    element: ({label}) => <ThemeSettingsToggle label={label}/>,
    type: RouteType.COMPONENT,
    section: 'settings',
}
```

## Як це працює

### 1. Рендеринг Сторінок (`AppRouter`)
`AppRouter` ітерується по `routerConfig`, фільтрує елементи, які мають `path`, і реєструє їх у стандартному компоненті `<Routes>` від `react-router-dom`.

### 2. Динамічний Сайдбар (`Sidebar`)
`Sidebar` отримує весь конфігурацію і розділяє її за `section`. При рендерингу він перевіряє `type`:
- Якщо це `LINK` — створюється `<NavLink>`.
- Якщо це `COMPONENT` — рендериться сам елемент (якщо це функція, вона викликається з `label`).

## Динамічні Маршрути

Система підтримує генерацію маршрутів на основі масивів даних. Наприклад, сторінки документації генеруються автоматично:

```typescript
const docRoutes: AppRoute[] = docPages.map(doc => ({
    id: `doc-${doc.name}`,
    path: `/docs/${doc.name}`,
    element: <DocViewer docName={doc.name}/>,
    type: RouteType.LINK,
    label: doc.label,
    // ...інші властивості
}));
```

## Як Додати Нову Функцію або Сторінку

1.  Якщо це сторінка — створіть її в `src/pages`.
2.  Додайте запис у `routerConfig.tsx`.
3.  Вкажіть `type: RouteType.LINK` для сторінки або `type: RouteType.COMPONENT` для віджета в меню.
4.  Виберіть секцію (`main` або `settings`) для правильного групування в інтерфейсі.
