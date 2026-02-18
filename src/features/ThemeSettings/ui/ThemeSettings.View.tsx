import { useTheme } from '@/shared/lib/theme/useTheme';
import { ThemeSettingsEditor } from './ThemeSettings.Editor';
import type {FC} from "react"; // Наш основний код

/**
 * ThemeSettingsView - контролер для редактора теми.
 * * Використовує `key={theme}` для повного перемонтування редактора при зміні теми.
 * Це гарантує:
 * 1. Скидання стейту `useState` до значень нової теми без каскадних рендерів.
 * 2. Виклик cleanup-функцій (очищення CSS-змінних) старої теми перед ініціалізацією нової.
 */
export const ThemeSettingsView: FC = () => {
    const { theme } = useTheme();

    return <ThemeSettingsEditor key={theme} />;
};