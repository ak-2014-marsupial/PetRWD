import {type ReactNode} from 'react';
import {motion} from "framer-motion";
import css from './Drawer.module.css';
import {Button} from "@/shared/ui";

interface DrawerProps {
    onClose: () => void;
    children: ReactNode;
    layoutId?: string;
}

export const Drawer = ({ onClose, children, layoutId }: DrawerProps) => {
    return (
        <motion.div
            layout
            layoutId={layoutId}
            className={css.drawer}
            transition={{ type: 'spring', damping: 40, stiffness: 100 }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
                <div className={css.header}>
                    <Button onClick={onClose} className={css.closeBtn}>Collapse</Button>
                </div>
                <div className={css.content}>{children}</div>
            </motion.div>
        </motion.div>
    );
};