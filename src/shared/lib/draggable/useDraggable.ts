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
        const pointerId = e.pointerId;

        const startPointerX = e.pageX;
        const startPointerY = e.pageY;
        const startElX = currentPos.x;
        const startElY = currentPos.y;

        let latestPos = { x: startElX, y: startElY };
        let dragStarted = false;

        const onPointerMove = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== pointerId) return;

            const deltaX = moveEvent.pageX - startPointerX;
            const deltaY = moveEvent.pageY - startPointerY;

            // Only start dragging if the pointer has moved beyond a small threshold (3px)
            if (!dragStarted && (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3)) {
                dragStarted = true;
                setIsDragging(true);
                try {
                    target.setPointerCapture(pointerId);
                } catch (err) {
                    console.warn('Failed to set pointer capture:', err);
                }
            }

            if (dragStarted) {
                const newPos = {
                    x: axis === 'y' ? startElX : startElX + deltaX,
                    y: axis === 'x' ? startElY : startElY + deltaY,
                };

                latestPos = newPos;
                setCurrentPos(newPos);
            }
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== pointerId) return;

            if (dragStarted) {
                try {
                    target.releasePointerCapture(pointerId);
                } catch (err) {
                    // Ignore errors if capture was already released or not set
                }
                setIsDragging(false);

                if (onDragEnd) {
                    onDragEnd(latestPos);
                }
            }

            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
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
