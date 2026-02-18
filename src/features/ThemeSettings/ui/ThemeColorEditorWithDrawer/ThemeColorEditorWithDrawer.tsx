import {Button, Slider, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

import css from "./ThemeColorEditorWithDrawerl.module.css";
import {useTheme} from "@/shared/lib";
import {useThemeEditor} from "@/features/ThemeSettings/lib/useThemeEditor.ts";
import {FIELDS} from "@/features/ThemeSettings/config/fieldsCssColor.ts";

const FloatingTrigger = withDraggable(({onClick}: { onClick: () => void }) => (
    <button
        onClick={onClick}
        style={{width: 50, height: 50, borderRadius: '50%', background: '#007bff', color: 'white', border: 'none'}}
    >
        Expand
    </button>
));



export const ThemeColorEditorWithDrawer = () => {
    const {isOpen, toggleCollapsed, isCollapsed} = useThemeDrawer();
    const {theme} = useTheme();
    const {vars, setFieldValue, save, reset} = useThemeEditor(theme);

    return (
        <>
            {isCollapsed && <FloatingTrigger canDrag={true} onClick={toggleCollapsed}/>}

            <SlidingPanel
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                side="right"
                fullWidth="20rem"
                collapsedWidth="10px"
                className={css.window}
            >
                <div className={css.header}>
                    <Button
                        onClick={toggleCollapsed}
                    >Collapse</Button>
                </div>
                <div key={theme} className={css.content}>
                    <h3>Налаштування ({theme})</h3>

                    {FIELDS.map((field) => (
                        <Slider
                            key={field.id}
                            {...field}
                            value={vars[field.id]}
                            onChange={setFieldValue}
                        />
                    ))}



                </div>
                <div className={css.buttons}>
                    <Button onClick={save}>Зберегти</Button>
                    <Button onClick={reset}>Очистити</Button>
                </div>

            </SlidingPanel>
        </>

    );
};
