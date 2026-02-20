import {memo, type ReactNode} from "react";

interface ButtonProps {
    onClick: () => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export const Button = memo(({ onClick, children, className }: ButtonProps) => {
    // console.log(`Render Button: ${children}`);
    return <button onClick={onClick} className={className}>{children}</button>;
});