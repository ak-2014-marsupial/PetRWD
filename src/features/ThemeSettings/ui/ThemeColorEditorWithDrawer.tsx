import {Drawer, withDraggable} from '@/shared/ui';
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts"; // Твій готовий компонент
import {ThemeSettings} from "./ThemeSettings.tsx";
import { motion, AnimatePresence } from 'framer-motion';

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
    const layoutId = "theme-editor-bubble";

    if (!isOpen) return null;

    return (
        <AnimatePresence initial={false}>
            {!isCollapsed ? (
                <Drawer key="drawer" layoutId={layoutId} onClose={toggleCollapsed}>
                    <ThemeSettings/>
                </Drawer>
            ) : (
                <motion.div
                    layout
                    layoutId={layoutId}
                    key="floating-trigger"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 40, stiffness: 100 }}
                    style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}
                >
                    <FloatingTrigger canDrag={true} onClick={toggleCollapsed}/>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
