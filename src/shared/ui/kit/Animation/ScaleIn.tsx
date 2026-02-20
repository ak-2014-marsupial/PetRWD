import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

const DURATION = 1;
const DELAY = 0;

interface ScaleInProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
}

export const ScaleIn = ({ children, ...props }: ScaleInProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: DURATION, delay: DELAY, ease: 'easeOut' }}
            {...props}
        >
            {children}
        </motion.div>
    );
};
