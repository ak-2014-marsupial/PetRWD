import type {ThemeVariables} from "@/features/ThemeSettings/model/types.ts";

export const FIELDS: { id: keyof ThemeVariables; label: string; min: number; max: number; unit?: string }[] = [
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