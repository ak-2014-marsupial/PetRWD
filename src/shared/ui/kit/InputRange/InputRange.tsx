import  { memo } from 'react';
import css from "./InputRange.module.css"

interface InputRangeProps {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step?:string;
    unit?: string;
    className?: string;
    hideLabel?: boolean;
    onChange: ({id, value}:{id: string, value: string}) => void;
}

 export const InputRange = memo(({ id, label, value, min, max,step, unit, className, hideLabel, onChange }: InputRangeProps) => {
    // console.log(`Render InputRange: ${id}`); // Для перевірки оптимізації
    return (
        <div className={`${css.InputRange} ${className || ''}`}>
            {!hideLabel && <label htmlFor={id}>{label}: {value}{unit}</label>}
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange({id, value:e.target.value})}
            />
        </div>
    );
});

