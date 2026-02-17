import  { memo } from 'react';
import css from "./Slider.module.css"

interface SliderProps {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
    onChange: (id: string, value: string) => void;
}

 export const Slider = memo(({ id, label, value, min, max, unit, onChange }: SliderProps) => {
    // console.log(`Render Slider: ${id}`); // Для перевірки оптимізації
    return (
        <div className={css.slider}>
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

