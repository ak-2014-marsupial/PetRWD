import { useState, useEffect, useCallback } from 'react';
import { themeVarsService } from '@/shared/lib/theme/themeVars.ts';
import { type Theme } from '@/shared/lib';
import {type ThemeVariables} from "../model/types.ts";

const STORAGE_PREFIX = 'custom_theme_vars_';

export const useThemeEditor = (theme: Theme) => {
    const getInitialVars = useCallback((t: Theme) => {
        const saved = localStorage.getItem(`${STORAGE_PREFIX}${t}`);
        return saved ? JSON.parse(saved) : themeVarsService.get(t);
    }, []);

    const [vars, setVars] = useState<ThemeVariables>(() => getInitialVars(theme));

    useEffect(() => {
        return () => themeVarsService.clear();
    }, [theme]);

    // Ефект для синхронізації з CSS-змінними
    useEffect(() => {
        themeVarsService.set(...(Object.values(vars) as Parameters<typeof themeVarsService.set>));
    }, [vars]);

    const setFieldValue = useCallback((id: string, value: string) => {
        setVars(prev => ({ ...prev, [id]: Number(value) }));
    }, []);

    const save = useCallback(() => {
        localStorage.setItem(`${STORAGE_PREFIX}${theme}`, JSON.stringify(vars));
        alert('Збережено!');
    }, [theme, vars]);

    const reset = useCallback(() => {
        localStorage.removeItem(`${STORAGE_PREFIX}${theme}`);
        setVars(themeVarsService.get(theme));
    }, [theme]);

    return { vars, setFieldValue, save, reset };
};