import React, { useState } from 'react';

export function withDraggable<T extends object>(Component: React.ComponentType<T>) {
    return (props: T & { canDrag?: boolean }) => {
        const [pos, setPos] = useState({ x: 0, y: 0 });

        const handleMouseDown = (e: React.MouseEvent) => {
            if (!props.canDrag) return;
            const startX = e.pageX - pos.x;
            const startY = e.pageY - pos.y;

            const onMouseMove = (moveEvent: MouseEvent) => {
                setPos({
                    x: moveEvent.pageX - startX,
                    y: moveEvent.pageY - startY,
                });
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const style: React.CSSProperties = {
            position: 'fixed',
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            zIndex: 1000,
            cursor: props.canDrag ? 'grab' : 'default',
            right: '20px',
            bottom: '20px'
        };

        return (
            <div onMouseDown={handleMouseDown} style={style}>
                <Component {...(props as T)} />
            </div>
        );
    };
}