import  { memo } from 'react';
import css from "./InputRange.module.css"

interface SliderProps {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
    onChange: (id: string, value: string) => void;
}

 export const InputRange = memo(({ id, label, value, min, max, unit, onChange }: SliderProps) => {
    // console.log(`Render InputRange: ${id}`); // Для перевірки оптимізації
    return (
        <div className={css.InputRange}>
            <label htmlFor={id}>{label}: {value}{unit}</label>
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(id, e.target.value)}
            />
        </div>
    );
});

