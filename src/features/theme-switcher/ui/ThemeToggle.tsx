import {Toggle} from "@/shared/ui";
import {useTheme} from "@/shared/lib";

export const ThemeToggle = ({label}:{label?:string}) => {
    const {theme, toggleTheme} = useTheme();
    if(!label) label="Theme color editor"

    const isNightMode = theme === 'app_dark_theme';

    return (
        <div style={{display: "flex", gap: "0.4rem"}}>
            <span>{label}</span>
            <Toggle active={isNightMode} setActive={toggleTheme}/>
        </div>
    );
};

