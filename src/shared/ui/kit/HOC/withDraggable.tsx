import React, { useState, useEffect } from 'react';

type DraggableProps = {
    /**
     * If true, the component can be dragged. Defaults to false.
     */
    canDrag?: boolean;
    /**
     * A unique key used to store and retrieve the component's position from localStorage.
     * This prop is required for position persistence.
     */
    storageKey: string;
    /**
     * The default position (x, y) to use if no position is found in localStorage
     * for the given storageKey. Defaults to { x: 0, y: 0 }.
     */
    defaultPos?: { x: number; y: number; };
    /**
     * Specifies the axis along which the component can be dragged.
     * 'x': Draggable horizontally only.
     * 'y': Draggable vertically only.
     * 'both': Draggable in both horizontal and vertical directions. (Default)
     */
    axis?: 'x' | 'y' | 'both';
    /**
     * Defines a fixed position relative to the parent for one or more sides,
     * effectively "pinning" the draggable component to that position.
     * When an axis is constrained (e.g., axis='y'), this can be used to set
     * the fixed coordinate (e.g., `pinPosition={{ right: 20 }}` to fix it 20px from the right).
     * If conflicting `left`/`right` or `top`/`bottom` are provided, the first one encountered is used.
     */
    pinPosition?: { left?: number; right?: number; top?: number; bottom?: number; };
};

type DraggablePosition = { x: number; y: number; };

export function withDraggable<T extends object>(Component: React.ComponentType<T>) {
    return (props: T & DraggableProps) => {
        const { canDrag, storageKey, defaultPos, axis = 'both', pinPosition, ...restProps } = props;

        const [pos, setPos] = useState<DraggablePosition>(() => {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse saved draggable position from localStorage", e);
                }
            }
            return defaultPos || { x: 0, y: 0 };
        });

        // Current position for drag calculations
        const [currentDragPos, setCurrentDragPos] = useState<DraggablePosition>(pos);

        // Update currentDragPos if pos changes (e.g., from external update via storage event or initial load)
        useEffect(() => {
            setCurrentDragPos(pos);
        }, [pos]);


        const handleMouseDown = (e: React.MouseEvent) => {
            if (!canDrag) return;

            const startMouseX = e.pageX;
            const startMouseY = e.pageY;
            const startElX = currentDragPos.x;
            const startElY = currentDragPos.y;

            const onMouseMove = (moveEvent: MouseEvent) => {
                let newX = startElX + (moveEvent.pageX - startMouseX);
                let newY = startElY + (moveEvent.pageY - startMouseY);

                if (axis === 'y') {
                    newX = currentDragPos.x; // Keep x fixed
                } else if (axis === 'x') {
                    newY = currentDragPos.y; // Keep y fixed
                }
                setCurrentDragPos({ x: newX, y: newY });
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

                setPos(currentDragPos); // Finalize position
                localStorage.setItem(storageKey, JSON.stringify(currentDragPos));
                window.dispatchEvent(new CustomEvent('storage_key_change', {
                    detail: {
                        key: storageKey,
                        value: currentDragPos
                    }
                }));
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const style: React.CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            cursor: canDrag ? 'grab' : 'default',
            // Default to using pos.x and pos.y for positioning
            left: currentDragPos.x,
            top: currentDragPos.y,
            // Apply overrides based on axis and pinPosition
            ...(axis === 'y' && pinPosition?.left !== undefined && { left: pinPosition.left }),
            ...(axis === 'y' && pinPosition?.right !== undefined && { right: pinPosition.right, left: 'auto' }),
            ...(axis === 'x' && pinPosition?.top !== undefined && { top: pinPosition.top }),
            ...(axis === 'x' && pinPosition?.bottom !== undefined && { bottom: pinPosition.bottom, top: 'auto' }),
            // Ensure no conflicting properties for right/bottom when left/top are set by pos
            ...(axis === 'y' && pinPosition?.right === undefined && { right: 'auto' }),
            ...(axis === 'x' && pinPosition?.bottom === undefined && { bottom: 'auto' }),
        };

        return (
            <div onMouseDown={handleMouseDown} style={style}>
                <Component {...(restProps as T)} />
            </div>
        );
    };
}