import {Drawer, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts"; // Твій готовий компонент
import {ThemeSettings} from "./ThemeSettings.tsx"

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

    if (!isOpen) return null;

    return (
        <>
            {!isCollapsed ? (
                <Drawer isOpen={true} onClose={toggleCollapsed}>
                    <ThemeSettings/>
                </Drawer>
            ) : (
                <FloatingTrigger canDrag={true} onClick={toggleCollapsed}/>
            )}
        </>
    );
};