import { type ReactNode} from 'react';
import css from './Drawer.module.css';
import {Button} from "@/shared/ui";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
    if (!isOpen) return null;

    return (
        <div className={css.drawer}>
            <div className={css.header}>
                <Button onClick={onClose} >Collapse</Button>
            </div>
            <div className={css.content}>{children}</div>
        </div>
    );
};