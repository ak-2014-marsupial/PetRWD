import {HomePage, NotFoundPage, ThemeSettingsPage} from '@/pages';
import {DocViewer,FontSizePicker, ThemeToggle, ThemeSettingsToggle} from '@/features';

import {
    FaHome, FaInfoCircle, FaPalette,
     FaRoute, FaAdjust, FaBell
} from 'react-icons/fa';
import {RxFontSize} from "react-icons/rx";
import {GiSettingsKnobs} from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";

import {type AppRoute, AppRoutes, RouteType} from './routerConfig.types.ts';

// Динамические роуты документации
const docPages = [
    {name: 'about', label: 'About', icon: <FaInfoCircle/>},
    {name: 'colors', label: 'Colors', icon: <FaPalette/>},
    {name: 'routing', label: 'Routing', icon: <FaRoute/>},
    {name: 'theme', label: 'Theming', icon: <FaAdjust/>},
    {name: 'notifications', label: 'Notifications', icon: <FaBell/>},
];

const docRoutes: AppRoute[] = docPages.map(doc => ({
    id: `doc-${doc.name}`,
    path: `/docs/${doc.name}`,
    element: <DocViewer docName={doc.name}/>,
    type: RouteType.LINK,
    isNav: true,
    section: 'main',
    label: doc.label,
    icon: doc.icon,
}));

export const routerConfig: AppRoute[] = [
    {
        id: 'home',
        path: AppRoutes.MAIN,
        element: <HomePage/>,
        type: RouteType.LINK,
        isNav: true,
        section: 'main',
        label: 'Home',
        icon: <FaHome/>,
    },

    ...docRoutes,

    // Секция настроек

    {
        id: 'settings-page',
        path: AppRoutes.THE_SETTINGS,
        element: <ThemeSettingsPage/>,
        type: RouteType.LINK,
        isNav: true,
        section: 'settings',
        label: "Full Settings",
        icon: <GiSettingsKnobs/>,
    },
    {
        id: 'font-size',
        element: <FontSizePicker/>,
        type: RouteType.COMPONENT,
        isNav: false,
        section: 'settings',
        label: "Font size",
        icon: <RxFontSize/>,
    },
    {
        id: 'theme-toggle',
        element: <ThemeToggle/>,
        type: RouteType.COMPONENT,
        isNav: false,
        section: 'settings',
        label: "Night Mode",
        icon: <MdDarkMode/>,
    },
    {
        id: 'theme-color-editor-toggle',
        element: <ThemeSettingsToggle/>,
        type: RouteType.COMPONENT,
        isNav: false,
        section: 'settings',
        label: "Color Editor",
        icon: <GiSettingsKnobs/>,
    },
    {
        id: 'not-found',
        path: AppRoutes.NOT_FOUND,
        element: <NotFoundPage/>,
        type: RouteType.LINK,
        isNav: false,
        section: 'main',
    },
];