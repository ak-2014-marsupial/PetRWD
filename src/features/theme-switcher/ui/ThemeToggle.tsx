import {Toggle} from "@/shared/ui";
import {useTheme} from "@/shared/lib";

export const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();
    const isNightMode = theme === 'app_dark_theme';

    return (
        <div style={{display: "flex", gap: "0.4rem"}}>
            <span>Night Mode</span>
            <Toggle active={isNightMode} setActive={toggleTheme}/>
        </div>
    );
};

