import {motion, AnimatePresence, type Variants} from 'framer-motion';
import {type ReactNode} from "react";

type PanelSide = 'left' | 'right';

interface SlidingPanelProps {
    isOpen: boolean;
    isCollapsed: boolean;
    side?: PanelSide;
    children: ReactNode;
    className?: string;
    // fullWidth?: string;
    collapsedWidth?: string;
    collapsedHeight?: string;
    targetY: number;
}

export const SlidingPanel = ({
                                 isOpen,
                                 isCollapsed,
                                 side = 'right',
                                 // fullWidth = '450px',
                                 collapsedWidth = '10px',
                                 collapsedHeight = '10px',
                                 children,
                                 className,
                                 targetY
                             }: SlidingPanelProps) => {


    const topPosition = isCollapsed ? `${targetY}px` : '15vh';
    const variants: Variants = {
        hidden: {
            // x: side === 'right' ? `calc(100% + ${offset})` : `calc(-100% - ${offset})`,
            x: side === 'right' ? `100% ` : `-100% `,

            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            width: isCollapsed ? collapsedWidth : "auto",
            height: isCollapsed ? collapsedHeight : "auto",
            top: topPosition,
            // Здесь мы настраиваем "вход" и "схлопывание"
            transition: {
                type: 'spring',
                stiffness: 40,
                damping: 12,
            }
        },
        exit: {
            x: side === 'right' ? `100% ` : `-100% `,
            opacity: 0,
            transition: {duration: 1, ease: "easeInOut"}
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
                    exit="exit"
                    className={className}
                    style={{
                        position: 'fixed',
                        [side]: 0,
                        zIndex: 1000,
                        overflow: 'hidden',
                        // display: 'flex',
                        // flexDirection: 'column',
                    }}
                >
                    <motion.div
                        animate={{opacity: isCollapsed ? 0 : 1}}
                        transition={{duration: 1}}
                        // style={{width: fullWidth, height: fullHeight}}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};