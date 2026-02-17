import { useTheme } from '@/shared/lib/theme/useTheme';
import { ThemeSettingsEditor } from './ThemeSettingsEditor';
import type {FC} from "react"; // Наш основний код

/**
 * ThemeSettings - контролер для редактора теми.
 * * Використовує `key={theme}` для повного перемонтування редактора при зміні теми.
 * Це гарантує:
 * 1. Скидання стейту `useState` до значень нової теми без каскадних рендерів.
 * 2. Виклик cleanup-функцій (очищення CSS-змінних) старої теми перед ініціалізацією нової.
 */
export const ThemeSettings: FC = () => {
    const { theme } = useTheme();

    return <ThemeSettingsEditor key={theme} />;
};