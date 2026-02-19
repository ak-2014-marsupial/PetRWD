import {Button, Slider, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

import css from "./ThemeSettings.Drawer.module.css";
import {type Theme, useTheme} from "@/shared/lib";
import {useThemeEditor} from "@/features/ThemeSettings/lib/useThemeEditor.ts";
import {FIELDS} from "@/features/ThemeSettings/model/config.ts";

const FloatingTrigger = withDraggable(({onClick}: { onClick: () => void }) => (
    <button
        onClick={onClick}
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

    return (
        <>
            {isCollapsed && <FloatingTrigger canDrag={true} onClick={toggleCollapsed}/>}

            <SlidingPanel
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                side="right"
                collapsedWidth="10px"
                className={css.container}
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