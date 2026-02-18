import {Route, Routes} from 'react-router-dom';
import {routerConfig} from '@/app/config';
import {AppShell, Footer, Header, Sidebar} from '@/widgets/app-shell';
import {ThemeSwitcher} from '@/features';

import {ThemeSettingsDrawer} from "@/features"
// import {useMemo} from 'react';

const ActionSlot = () => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <ThemeSwitcher/>
        </div>
    )
}
const sidebarSlot = () => {
    return (
        <>
            <Sidebar navItems={routerConfig}/>
            <ThemeSettingsDrawer />
        </>
    )
}


export const AppRouter = () => {


    // const navItems = useMemo(() => {
    //     return routerConfig
    //         // .filter((route) => route.isNav && route.label && route.icon)
    //         .map((route) => {
    //             return {
    //                 id:route.id,
    //                 path: route.path,
    //                 type:route.type,
    //                 label: route.label!,
    //                 icon: route.icon!,
    //                 element:ReactNode;
    //             }
    //         });
    // }, []);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AppShell
                        headerSlot={<Header actionsSlot={<ActionSlot/>}/>}
                        sidebarSlot={sidebarSlot()}
                        footerSlot={<Footer/>}
                    />
                }
            >
                {routerConfig.map(({element, path}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
            </Route>
        </Routes>
    );
};
