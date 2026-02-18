import {Button, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";
import {ThemeSettingsEditor} from "../ThemeSettingsEditor"

import css from "./ThemeColorEditorWithDrawerl.module.css";

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


    return (
        <>
            {isCollapsed && <FloatingTrigger canDrag={true} onClick={toggleCollapsed}/>}

            <SlidingPanel
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                side="right"
                width="20rem"
                collapsedWidth="70px"
            >
                <div className={css.header}>
                    <Button
                        onClick={toggleCollapsed}
                    >Collapse</Button>
                </div>
                <div className={css.content}>
                    <ThemeSettingsEditor/>
                </div>

            </SlidingPanel>
        </>

    );
};
