import {memo} from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export const Button = memo(({ onClick, children }: ButtonProps) => {
    // console.log(`Render Button: ${children}`);
    return <button onClick={onClick}>{children}</button>;
});