import type {Theme} from "@/shared/lib";
import {useThemeEditor} from "@/features/ThemeSettings/lib/useThemeEditor.ts";
import {FIELDS} from "@/features/ThemeSettings/model/config.ts";
import {Button, InputRange, Expandable} from "@/shared/ui";
import type {ReactNode} from "react";

import css from "./ThemeSettings.Form.module.css";

interface ThemeSettingsFormProps {
    theme: Theme;
    headerSlot?: ReactNode;
}


export const ThemeSettingsForm = ({theme, headerSlot}: ThemeSettingsFormProps) => {
    const {vars, setFieldValue, save, reset} = useThemeEditor(theme);

    return (
        <>
            <div className={css.header}>
                {headerSlot}
                <h5>Налаштування ({theme})</h5>
            </div>
            <div className={css.content}>
                {FIELDS.map((group) => (
                    <div key={group.group} className={css.group}>
                        <h4 className={css.groupLabel}>{group.label}</h4>

                        {group.children.map((field) => (
                            <Expandable 
                                key={field.id} 
                                title={field.label} 
                                value={vars[field.id]} 
                                unit={field.unit}
                            >
                                <InputRange
                                    className={css.child}
                                    {...field}
                                    hideLabel
                                    value={vars[field.id]}
                                    onChange={setFieldValue}
                                />
                            </Expandable>
                        ))}
                    </div>
                ))}
            </div>
            <div className={css.footer}>
                <Button  onClick={save}>Зберегти</Button>
                <Button onClick={reset}>Очистити</Button>
            </div>
        </>
    );
};

