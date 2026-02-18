import {type FC} from 'react';
import {useTheme} from '@/shared/lib/theme/useTheme.ts';
import {useThemeEditor} from "../lib/useThemeEditor.ts";
import {Slider, Button} from '@/shared/ui';
import {FIELDS} from "../model/config.ts"
import css from './ThemeSettings.Editor.module.css';

export const ThemeSettingsEditor: FC = () => {
    const {theme} = useTheme();
    const {vars, setFieldValue, save, reset} = useThemeEditor(theme);

    return (
        <div className={css.ThemeSettings}>
            <h3>Налаштування ({theme})</h3>

            {FIELDS.map((field) => (
                <Slider
                    key={field.id}
                    {...field}
                    value={vars[field.id]}
                    onChange={setFieldValue}
                />
            ))}

            <div className={css.buttons}>
                <Button onClick={save}>Зберегти</Button>
                <Button onClick={reset}>Очистити</Button>
            </div>
        </div>
    );
};