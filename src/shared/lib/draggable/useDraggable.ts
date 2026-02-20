import { useState, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from 'react';

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
    const [isDragging, setIsDragging] = useState(false);

    // Sync state if initialPosition changes
    useEffect(() => {
        setCurrentPos(initialPosition);
    }, [initialPosition]);

    const handlePointerDown = useCallback((e: ReactPointerEvent) => {
        if (!canDrag) return;

        const target = e.currentTarget as HTMLElement;
        target.setPointerCapture(e.pointerId);

        setIsDragging(true);

        const startPointerX = e.pageX;
        const startPointerY = e.pageY;
        const startElX = currentPos.x;
        const startElY = currentPos.y;

        let latestPos = { x: startElX, y: startElY };

        const onPointerMove = (moveEvent: PointerEvent) => {
            const deltaX = moveEvent.pageX - startPointerX;
            const deltaY = moveEvent.pageY - startPointerY;

            const newPos = {
                x: axis === 'y' ? startElX : startElX + deltaX,
                y: axis === 'x' ? startElY : startElY + deltaY,
            };

            latestPos = newPos;
            setCurrentPos(newPos);
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            target.releasePointerCapture(upEvent.pointerId);
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);

            setIsDragging(false);

            if (onDragEnd) {
                onDragEnd(latestPos);
            }
        };

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    }, [canDrag, axis, currentPos, onDragEnd]);

    return {
        position: currentPos,
        handlePointerDown,
        isDragging,
    };
}
