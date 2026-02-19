import {Button, Slider, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

import css from "./ThemeSettings.Drawer.module.css";
import {type Theme, useTheme} from "@/shared/lib";
import {useThemeEditor} from "@/features/ThemeSettings/lib/useThemeEditor.ts";
import {FIELDS} from "@/features/ThemeSettings/model/config.ts";
import {useEffect, useState} from "react";

const STORAGE_KEY = 'theme-drawer-position';

const FloatingTrigger = withDraggable((props: { onClick: () => void }) => (
    <button
        onClick={props.onClick}
        style={{width: 50, height: 50, borderRadius: '50%', background: '#007bff', color: 'white', border: 'none'}}
    >
        Expand
    </button>
));

const DrawerContent = ({ theme }: { theme: Theme }) => {
    const {vars, setFieldValue, save, reset} = useThemeEditor(theme);

    return (
        <>
            <div className={css.content}>

                {FIELDS.map((field) => (
                    <Slider
                        key={field.id}
                        {...field}
                        value={vars[field.id]}
                        onChange={setFieldValue}
                    />
                ))}
            </div>
            <div className={css.footer}>
                <Button onClick={save}>Зберегти</Button>
                <Button onClick={reset}>Очистити</Button>
            </div>
        </>
    );
};

export const ThemeSettingsDrawer = () => {
    const {isOpen, toggleCollapsed, isCollapsed} = useThemeDrawer();
    const {theme} = useTheme();

    const getInitialY = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved).y;
            } catch (e) {
                console.error("Failed to parse saved position from localStorage", e);
            }
        }
        return 700; // Default Y position
    };

    const [targetY, setTargetY] = useState<number>(getInitialY);

    useEffect(() => {
        const handleStorageChange = (event: CustomEvent<{ key: string, value: { x: number, y: number } }>) => {
            if (event.detail.key === STORAGE_KEY) {
                setTargetY(event.detail.value.y);
            }
        };
        window.addEventListener('storage_key_change' as any, handleStorageChange);

        return () => {
            window.removeEventListener('storage_key_change' as any, handleStorageChange);
        };
    }, []);

    // Default X position for the draggable trigger, fixed to the right
    const defaultX = window.innerWidth - 100;

    return (
        <>
            {isCollapsed && (
                <FloatingTrigger
                    canDrag={true}
                    onClick={toggleCollapsed}
                    storageKey={STORAGE_KEY}
                    defaultPos={{ x: defaultX, y: 700 }} // Default position for the draggable trigger
                    axis="y" // Only allow vertical dragging
                    pinPosition={{ right: 20 }} // Pin to the right edge
                />
            )}

            <SlidingPanel
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                side="right"
                collapsedWidth="10px"
                className={css.container}
                targetY={targetY}
            >
                <div className={css.header}>
                    <h5>Налаштування ({theme})</h5>
                    <Button onClick={toggleCollapsed}>Collapse</Button>
                </div>
                <DrawerContent key={theme} theme={theme} />
            </SlidingPanel>
        </>
    );
};