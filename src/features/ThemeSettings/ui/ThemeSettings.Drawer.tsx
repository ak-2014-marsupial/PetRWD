import {Button, Slider, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

import css from "./ThemeSettings.Drawer.module.css";
import {type Theme, useTheme} from "@/shared/lib";
import {useThemeEditor} from "@/features/ThemeSettings/lib/useThemeEditor.ts";
import {FIELDS} from "@/features/ThemeSettings/model/config.ts";
import {useState} from "react";
import {GiSettingsKnobs} from "react-icons/gi";
import { BsArrowsCollapse } from "react-icons/bs";

const STORAGE_KEY = 'theme-drawer-position';

const DraggableButton = withDraggable((props: { onClick: () => void }) => (
    <Button
        onClick={props.onClick}
        className={css.draggableButton}
    >
        <GiSettingsKnobs/>
    </Button>
));

const FloatingTrigger = (props: {
    isOpen: boolean;
    isCollapsed: boolean;
    onClick: () => void;
    position: { x: number; y: number };
    onDragEnd: (pos: { x: number; y: number }) => void;
}) => {
    const {isOpen, isCollapsed, onClick, position, onDragEnd} = props;
    const isVisible = isOpen && isCollapsed;

    return (
        <DraggableButton
            className={`${css.trigger} ${isVisible ? css.triggerVisible : ''}`}
            canDrag={true}
            onClick={onClick}
            position={position}
            onDragEnd={onDragEnd}
            axis="y"
            pinPosition={{right: 20}}
        />
    );
};

const DrawerContent = ({theme}: { theme: Theme }) => {
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
    const positionDefault = {x: 200, y: 400}

    const getInitialPosition = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved position from localStorage", e);
            }
        }
        return {x: window.innerWidth - positionDefault.x, y: positionDefault.y};
    };

    const [position, setPosition] = useState<{ x: number, y: number }>(getInitialPosition);

    const handleDragEnd = (newPos: { x: number, y: number }) => {
        setPosition(newPos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPos));
    };

    return (
        <>
            <FloatingTrigger
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                onClick={toggleCollapsed}
                position={position}
                onDragEnd={handleDragEnd}
            />

            <SlidingPanel
                isOpen={isOpen}
                isCollapsed={isCollapsed}
                side="right"
                collapsedWidth="1px"
                className={css.container}
                targetY={position.y}
            >
                <div className={css.header}>
                    <Button onClick={toggleCollapsed}><BsArrowsCollapse/></Button>
                    <h5>Налаштування ({theme})</h5>
                </div>
                <DrawerContent key={theme} theme={theme}/>
            </SlidingPanel>
        </>
    );
};
