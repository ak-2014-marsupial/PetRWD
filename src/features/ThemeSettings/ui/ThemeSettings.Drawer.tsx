import {Button, SlidingPanel, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

import css from "./ThemeSettings.Drawer.module.css";
import {useTheme} from "@/shared/lib";
import {useState} from "react";
import {GiSettingsKnobs} from "react-icons/gi";
import {BsArrowsCollapse} from "react-icons/bs";
import {ThemeSettingsForm} from "@/features/ThemeSettings/ui/ThemeSettings.Form.tsx";

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


export const ThemeSettingsDrawer = () => {
    const {isOpen, toggleCollapsed, isCollapsed} = useThemeDrawer();
    const {theme} = useTheme();
    const positionDefault = {x: 200, y: 400};
    const headerSlot = <Button onClick={toggleCollapsed}><BsArrowsCollapse/></Button>;

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
                <ThemeSettingsForm key={theme} theme={theme} headerSlot={headerSlot}/>
            </SlidingPanel>
        </>
    );
};
