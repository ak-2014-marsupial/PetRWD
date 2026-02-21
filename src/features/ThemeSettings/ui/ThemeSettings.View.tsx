import { useTheme } from '@/shared/lib/theme/useTheme';
import type {FC} from "react";
import {ThemeSettingsForm} from "@/features/ThemeSettings/ui/ThemeSettings.Form.tsx"; // Наш основний код

export const ThemeSettingsView: FC = () => {
    const { theme } = useTheme();

    return <ThemeSettingsForm key={theme} theme={theme} />;
};