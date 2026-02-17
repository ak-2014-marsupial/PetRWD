import {type FC} from 'react';
import {useTheme} from '@/shared/lib/theme/useTheme.ts';
import {useThemeEditor} from "../../lib/useThemeEditor.ts";
import {type ThemeVariables} from "../../model/types.ts"
import {Slider, Button} from '@/shared/ui';
import css from './ThemeSettingsEditor.module.css';


// Конфігурація полів для рендеру
const FIELDS: { id: keyof ThemeVariables; label: string; min: number; max: number; unit?: string }[] = [
    {id: 'h', label: 'Тон (H)', min: 0, max: 360},
    {id: 's', label: 'Насиченість (S)', min: 0, max: 100, unit: '%'},
    {id: 'lBase', label: 'Яскравість (L-Base)', min: 0, max: 100, unit: '%'},
    {id: 'lStep', label: 'Крок затемнення (L-Step)', min: 0, max: 10, unit: '%'},
    {id: 'accS', label: 'Насиченість акценту (Acc-S)', min: 0, max: 100, unit: '%'},
    {id: 'accL', label: 'Яскравість акценту (Acc-L)', min: 0, max: 100, unit: '%'},
    {id: 'textS', label: 'Насиченість тексту (Text-S)', min: 0, max: 100, unit: '%'},
    {id: 'textL', label: 'Яскравість тексту (Text-L)', min: 0, max: 100, unit: '%'},
    {id: 'textSStep', label: 'Крок насиченості тексту', min: -20, max: 20, unit: '%'},
    {id: 'textLStep', label: 'Крок яскравості тексту', min: -20, max: 20, unit: '%'},
];


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