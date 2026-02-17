import {useEffect, useState} from "react";
import {themeService, type Theme} from "./theme.ts";

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
    }

    return {
        theme,
        toggleTheme
    }
}