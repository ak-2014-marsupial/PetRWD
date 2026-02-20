import { useState, useEffect, useCallback, type MouseEvent as ReactMouseEvent } from 'react';

export type Position = { x: number; y: number };

export type DraggableAxis = 'x' | 'y' | 'both';

export interface UseDraggableOptions {
    canDrag?: boolean;
    initialPosition?: Position;
    axis?: DraggableAxis;
    onDragEnd?: (position: Position) => void;
}

export function useDraggable({
    canDrag = false,
    initialPosition = { x: 0, y: 0 },
    axis = 'both',
    onDragEnd,
}: UseDraggableOptions = {}) {
    const [currentPos, setCurrentPos] = useState<Position>(initialPosition);

    // Sync state if initialPosition changes
    useEffect(() => {
        setCurrentPos(initialPosition);
    }, [initialPosition]);

    const handleMouseDown = useCallback((e: ReactMouseEvent) => {
        if (!canDrag) return;

        const startMouseX = e.pageX;
        const startMouseY = e.pageY;
        const startElX = currentPos.x;
        const startElY = currentPos.y;

        // Use local variable to track the latest position within the closure
        let latestPos = { x: startElX, y: startElY };

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.pageX - startMouseX;
            const deltaY = moveEvent.pageY - startMouseY;

            const newPos = {
                x: axis === 'y' ? startElX : startElX + deltaX,
                y: axis === 'x' ? startElY : startElY + deltaY,
            };

            latestPos = newPos;
            setCurrentPos(newPos);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (onDragEnd) {
                onDragEnd(latestPos);
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, [canDrag, axis, currentPos, onDragEnd]);

    return {
        position: currentPos,
        handleMouseDown,
        isDragging: false, // Could be extended to track dragging state
    };
}
