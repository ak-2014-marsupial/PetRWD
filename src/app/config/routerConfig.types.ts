import { type ReactNode } from 'react';

export const RouteType = {
    LINK: 'LINK',
    COMPONENT: 'COMPONENT',
    DIVIDER: 'DIVIDER'
} as const;

export type RouteTypeValues = typeof RouteType[keyof typeof RouteType];

export const AppRoutes = {
    MAIN: '/',
    THE_SETTINGS: '/theme_settings',
    NOT_FOUND: '*',
} as const;

export interface AppRoute {
    id: string;
    type: RouteTypeValues;
    isNav: boolean;
    section: 'main' | 'settings';
    element: ReactNode;
    path?: string;
    label?: string;
    icon?: ReactNode;
}