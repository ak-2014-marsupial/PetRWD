import { useEffect, useState } from 'react';
import { themeSettingsService, type ThemeSettingsState } from '../model';

export const useThemeDrawer = () => {
    const [state, setState] = useState<ThemeSettingsState>(themeSettingsService.getState());

    useEffect(() => {
        const unsubscribe = themeSettingsService.subscribe(setState);
        return unsubscribe;
    }, []);

    return {
        isOpen: state.isOpen,
        isCollapsed: state.isCollapsed,
        openDrawer: themeSettingsService.openDrawer,
        closeDrawer: themeSettingsService.closeDrawer,
        toggleDrawer: themeSettingsService.toggleDrawer,
        toggleCollapsed: themeSettingsService.toggleCollapsed,
    };
};