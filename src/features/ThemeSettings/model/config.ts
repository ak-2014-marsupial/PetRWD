import type {ThemeVariables} from "@/features/ThemeSettings/model/types.ts";

export interface ThemeField {
    id: keyof ThemeVariables;
    label: string;
    min: number;
    max: number;
    unit?: string;
}

export interface ThemeGroup {
    group: string;
    label: string;
    children: ThemeField[];
}

export const FIELDS: ThemeGroup[] = [
    {group:'base',label:'База',children:[
            {id: 'h', label: 'Тон (H)', min: 0, max: 360},
            {id: 's', label: 'Насиченість (S)', min: 0, max: 100, unit: '%'},
            {id: 'lBase', label: 'Яскравість (L-Base)', min: 0, max: 100, unit: '%'},
            {id: 'lStep', label: 'Крок затемнення (L-Step)', min: 0, max: 10, unit: '%'},
        ]},
    {group:'accent',label:'Акцент',children:[
            {id: 'accS', label: 'Насиченість (Acc-S)', min: 0, max: 100, unit: '%'},
            {id: 'accL', label: 'Яскравість (Acc-L)', min: 0, max: 100, unit: '%'},
        ]},
    {group:'text',label:'Текст',children:[
            {id: 'textS', label: 'Насиченість(Text-S)', min: 0, max: 100, unit: '%'},
            {id: 'textL', label: 'Яскравість(Text-L)', min: 0, max: 100, unit: '%'},
            {id: 'textSStep', label: 'Крок насиченості', min: -20, max: 20, unit: '%'},
            {id: 'textLStep', label: 'Крок яскравості', min: -20, max: 20, unit: '%'},
        ]},

];