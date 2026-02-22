import {NavLink} from 'react-router-dom';
import css from './Sidebar.module.css';
import {type AppRoute, RouteType} from "@/app/config/routerConfig.types.ts";
import {useState} from "react";
import {MdMenu} from 'react-icons/md';

interface SidebarProps {
    navItems: AppRoute[];
}

export const Sidebar = ({navItems}: SidebarProps) => {

    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1024);
    const renderItem = (item: AppRoute) => {

        if (item.type === RouteType.LINK && item.path) {
            return (
                <li key={item.id}>
                    <NavLink
                        to={item.path}
                        className={css.row}
                    >
                        <span className={css.icon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                </li>
            )
        } else if (item.type === RouteType.COMPONENT) {
            const component = typeof item.element === 'function'
                ? item.element({ label: item.label })
                : item.element;

            return (
                <li key={item.id}>
                    <div className={css.row}>
                        <span className={css.icon}>{item.icon}</span>
                        {component}
                    </div>
                </li>
            )
        }
    }

    const toggleCollapsed=()=>{
        setIsCollapsed(prev=>!prev)
    }

    return (
        <div className={`${css.sidebarWrapper} ${isCollapsed ? css.collapsed : ''}`}>

            <button className={css.MenuButton} onClick={toggleCollapsed}>
                <span className={css.icon}><MdMenu/></span>
            </button>
            <aside className={css.sidebar}>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            renderItem(item)
                        ))}
                    </ul>
                </nav>

            </aside>
        </div>
    );
};


