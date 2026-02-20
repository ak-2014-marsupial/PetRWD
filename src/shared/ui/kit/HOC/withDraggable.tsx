import React, { type CSSProperties } from 'react';
import { useDraggable, type Position, type DraggableAxis } from '@/shared/lib';

export type DraggableProps = {
    /** If true, the component can be dragged. Defaults to false. */
    canDrag?: boolean;
    /** The position (x, y) of the component. Required to be controlled or semi-controlled. */
    position: Position;
    /** Callback triggered when dragging ends. */
    onDragEnd?: (position: Position) => void;
    /** Specifies the axis along which the component can be dragged. */
    axis?: DraggableAxis;
    /** Defines a fixed position relative to the parent for one or more sides. */
    pinPosition?: { left?: number; right?: number; top?: number; bottom?: number; };
    className?: string;
};

export function withDraggable<T extends object>(Component: React.ComponentType<T>) {
    return (props: T & DraggableProps) => {
        const {
            canDrag = false,
            position,
            onDragEnd,
            axis = 'both',
            pinPosition,
            className,
            ...restProps
        } = props;

        const { position: currentDragPos, handlePointerDown, isDragging } = useDraggable({
            canDrag,
            initialPosition: position,
            axis,
            onDragEnd,
        });

        // "Polite" styles: only set what's strictly necessary for dynamic positioning
        const style: CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            touchAction: 'none',
            left: currentDragPos.x,
            top: currentDragPos.y,
            cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'default',
            
            // Only override opacity during active dragging
            ...(isDragging && { 
                opacity: 0.8,
                transition: 'none' // Disable transitions while dragging for performance
            }),

            // Apply overrides based on pinPosition
            ...(axis === 'y' && pinPosition?.left !== undefined && { left: pinPosition.left }),
            ...(axis === 'y' && pinPosition?.right !== undefined && { right: pinPosition.right, left: 'auto' }),
            ...(axis === 'x' && pinPosition?.top !== undefined && { top: pinPosition.top }),
            ...(axis === 'x' && pinPosition?.bottom !== undefined && { bottom: pinPosition.bottom, top: 'auto' }),
            
            // Ensure no conflicting properties
            ...(axis === 'y' && pinPosition?.right === undefined && { right: 'auto' }),
            ...(axis === 'x' && pinPosition?.bottom === undefined && { bottom: 'auto' }),
        };

        return (
            <div 
                onPointerDown={handlePointerDown} 
                style={style} 
                className={className}
            >
                <Component {...(restProps as T)} />
            </div>
        );
    };
}
