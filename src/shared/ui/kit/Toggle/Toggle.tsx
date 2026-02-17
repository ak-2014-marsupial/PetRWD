import css from "./Toggle.module.css";
import {memo, type CSSProperties} from "react";

interface ToggleProps {
    width?: string ;
    size?: string;
    active: boolean;
    setActive: () => void;
}


export const Toggle = memo(({active, setActive, width = "2.5rem", size = "1rem"}: ToggleProps) => {
    return (
            <div className={css.Toggle} style={{width}}>
                <input type="checkbox" checked={active} onChange={() => {
                }} id="dark-mode"/>
                <label style={{'--_after-size': size} as CSSProperties} htmlFor="dark-mode" onClick={setActive}></label>
            </div>
        );
    }
)

