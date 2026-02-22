import {useCallback, useState} from "react";
import {fontSizeService, FONT_SIZE_MAX_SIZE, FONT_SIZE_MIN_SIZE} from "@/shared/lib";
import {InputRange} from "@/shared/ui";

export const FontSizePicker = () => {
    const [size, setSize] = useState(() => fontSizeService.get());


    const handleChange = useCallback(({value}: { value: string }) => {
        const newSize = Number(value);
        setSize(newSize);
        fontSizeService.set(newSize);
    }, []);

    return (
        <InputRange
            id={"font-size-slider"}
            label="Розмір тексту"
            unit="px"
            value={size}
            min={FONT_SIZE_MIN_SIZE}
            max={FONT_SIZE_MAX_SIZE}
            step="1"
            onChange={handleChange}
        />
    );
};