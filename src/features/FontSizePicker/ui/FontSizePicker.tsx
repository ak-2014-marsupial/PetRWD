import css from "./FontSizePicker.module.css"
import {type ChangeEvent, useState} from "react";
import {fontSizeService, FONT_SIZE_MAX_SIZE, FONT_SIZE_MIN_SIZE} from "@/shared/lib";

export const FontSizePicker = () => {
    const [size, setSize] = useState(() => fontSizeService.get());

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSize = Number(e.target.value);
        setSize(newSize);
        fontSizeService.set(newSize);
    };

    return (
        <div className={css.slider}>
            <label htmlFor="font-size-slider">Розмір тексту: {size}px</label>
            <input
                id="font-size-slider"
                type="range"
                min={FONT_SIZE_MIN_SIZE}
                max={FONT_SIZE_MAX_SIZE}
                step="1"
                value={size}
                onChange={handleChange}
                className={css.slider}
            />
        </div>
    );
};