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
};

export function withDraggable<T extends object>(Component: React.ComponentType<T>) {
    return (props: T & DraggableProps) => {
        const {
            canDrag = false,
            position,
            onDragEnd,
            axis = 'both',
            pinPosition,
            ...restProps
        } = props;

        const { position: currentDragPos, handleMouseDown } = useDraggable({
            canDrag,
            initialPosition: position,
            axis,
            onDragEnd,
        });

        const style: CSSProperties = {
            position: 'fixed',
            zIndex: 1000,
            cursor: canDrag ? 'grab' : 'default',
            left: currentDragPos.x,
            top: currentDragPos.y,
            // Apply overrides based on pinPosition
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