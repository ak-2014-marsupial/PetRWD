import {Toggle} from "@/shared/ui";
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

export const ThemeSettingsToggle = ({label}:{label?:string}) => {
    const {isOpen, toggleDrawer} = useThemeDrawer();
    if(!label) label="Theme color editor"
    return (
        <div style={{display: "flex", gap: "0.4rem"}}>
            <span>{label}</span>
            <Toggle active={isOpen} setActive={toggleDrawer}/>
        </div>
    );
};

