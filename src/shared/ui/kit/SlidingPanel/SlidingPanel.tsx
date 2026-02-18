import { motion, AnimatePresence,type Variants } from 'framer-motion';
import {type ReactNode} from "react"

type PanelSide = 'left' | 'right';

interface SlidingPanelProps {
    isOpen: boolean;
    isCollapsed?: boolean;
    side?: PanelSide;
    children: ReactNode;
    className?: string;
    width?: string;
    collapsedWidth?: string;
}

const panelVariants: Variants = {
    hidden: (side: PanelSide) => ({
        x: side === 'right' ? '100%' : '-100%',
        transition: { duration: 2, ease: 'easeInOut' }
    }),
    visible: {
        x: 0,
        // transition: { duration: 2, ease: 'easeInOut' }
        transition: { type: 'spring', stiffness: 90, damping: 9, mass: 0.9 }
    },
    exit: (side: PanelSide) => ({
        x: side === 'right' ? '100%' : '-100%',
        transition: { duration: 2, ease: 'easeInOut' }
    })
};

export const SlidingPanel = ({
                                 isOpen,
                                 isCollapsed = false,
                                 side = 'right',
                                 width = '20rem',
                                 collapsedWidth = '80px',
                                 children,
                                 className
                             }: SlidingPanelProps) => {
    return (
        <AnimatePresence custom={side}>
            {isOpen && (
                <motion.div
                    layout
                    custom={side}
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={className}
                    style={{
                        position: 'fixed',
                        [side]: 0,
                        width: isCollapsed ? collapsedWidth : width,
                        zIndex: 1000,
                        overflow: 'hidden', // Обрезаем всё, что не влезает
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Внутренняя обертка для контента */}
                    <motion.div
                        animate={{
                            opacity: isCollapsed ? 0 : 1,
                            filter: isCollapsed ? 'blur(4px)' : 'blur(0px)' // Опционально: легкий блюр при скрытии
                        }}
                        transition={{ duration: 2 }}
                        style={{
                            width: width, // Фиксируем ширину контента, чтобы он не сжимался
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};