import {useEffect, useState} from "react";
import {themeService, type Theme} from "./theme.ts";
import {notificationService} from "@/shared/lib";

interface IUseTheme {
    toggleTheme: () => void;
    theme: Theme
}

export const useTheme = (): IUseTheme => {
    const [theme, setTheme] = useState<Theme>(themeService.get());

    useEffect(() => {
        const unsubscribe = themeService.subscribe(setTheme);
        return unsubscribe;
    }, []);

    const toggleTheme = () => {
        themeService.toggle();
        notificationService.success(`Тему змінено на ${themeService.get() === 'app_light_theme' ? 'світлу' : 'темну'}`);
    }

    return {
        theme,
        toggleTheme
    }
}