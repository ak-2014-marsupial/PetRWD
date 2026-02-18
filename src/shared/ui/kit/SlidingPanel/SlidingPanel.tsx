import { motion, AnimatePresence,type Variants } from 'framer-motion';
import {type ReactNode, useEffect, useState} from "react"

type PanelSide = 'left' | 'right';

interface SlidingPanelProps {
    isOpen: boolean;
    isCollapsed: boolean;
    side?: PanelSide;
    children: ReactNode;
    className?: string;
    fullWidth?: string;
    fullHeight?: string;
    collapsedWidth?: string;
    collapsedHeight?: string;
}

export const SlidingPanel = ({
                                 isOpen,
                                 isCollapsed,
                                 side = 'right',
                                 fullWidth = '450px',
                                 fullHeight = '70vh',
                                 collapsedWidth = '10px',
                                 collapsedHeight = '10px',
                                 children,
                                 className
                             }: SlidingPanelProps) => {
    // Состояние для фиксации Y в момент схлопывания
    const [targetY, setTargetY] = useState<string | number>('15vh');

    useEffect(() => {
        if (isCollapsed) {
            // const savedY = localStorage.getItem('panel-y');
            const savedY=700;
            setTargetY(savedY ? `${savedY}px` : '15vh');
        } else {
            // Когда развертываемся — возвращаемся к стандарту
            setTargetY('15vh');
        }
    }, [isCollapsed]); // Следим только за этим флагом

    const variants: Variants = {
        hidden: {
            x: side === 'right' ? '100%' : '-100%',
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            width: isCollapsed ? collapsedWidth : fullWidth,
            height: isCollapsed ? collapsedHeight : fullHeight,
            top: targetY,
            transition: { type: 'spring', stiffness: 90, damping: 12 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    layout
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={className}
                    style={{
                        position: 'fixed',
                        [side]: 0,
                        zIndex: 1000,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <motion.div
                        animate={{ opacity: isCollapsed ? 0 : 1 }}
                        transition={{ duration: 2 }}
                        style={{ width: fullWidth, height: fullHeight }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};