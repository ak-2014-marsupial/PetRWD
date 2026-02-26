import { useState, type ReactNode, memo } from "react";
import css from "./Expandable.module.css";

interface ExpandableProps {
    title: string;
    value?: string | number;
    unit?: string;
    children: ReactNode;
    defaultExpanded?: boolean;
    className?: string;
}

export const Expandable = memo(({ 
    title, 
    value, 
    unit = "", 
    children, 
    defaultExpanded = false,
    className = "" 
}: ExpandableProps) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggle = () => setIsExpanded(prev => !prev);

    return (
        <div className={`${css.Expandable} ${isExpanded ? css.expanded : ""} ${className}`}>
            <div className={css.summary} onClick={toggle} role="button" tabIndex={0}>
                <span className={css.label}>{title}</span>
                <div className={css.right}>
                    <span className={css.value}>{value}{unit}</span>
                    <span className={css.icon}>{isExpanded ? "−" : "+"}</span>
                </div>
            </div>
            {isExpanded && (
                <div className={css.content}>
                    {children}
                </div>
            )}
        </div>
    );
});
