import {Toggle} from "@/shared/ui";
import {useThemeDrawer} from "@/features/ThemeSettings/lib/useThemeDrawer.ts";

export const ThemeSettingsToggle = () => {
    const {isOpen, toggleDrawer} = useThemeDrawer()
    return (
        <div style={{display: "flex", gap: "0.4rem"}}>
            <span>Theme color editor</span>
            <Toggle active={isOpen} setActive={toggleDrawer}/>
        </div>
    );
};

