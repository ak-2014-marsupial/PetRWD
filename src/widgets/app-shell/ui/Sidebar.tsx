import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.css';
import {type AppRoute, RouteType} from "@/app/config/routerConfig.types.ts";

interface SidebarProps {
    navItems: AppRoute[];
}

export const Sidebar = ({navItems}: SidebarProps) => {

    const renderItem = (item: AppRoute) => {

        if (item.type === RouteType.LINK && item.path) {
            return (
                <li key={item.id}>
                    <NavLink
                        to={item.path}
                        className={styles.row}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                </li>
            )
        } else if (item.type === RouteType.COMPONENT) {
            return (
                <li key={item.id}>
                    <div className={styles.row}>
                        <span className={styles.icon}>{item.icon}</span>
                        <span>{item.element}</span>
                    </div>
                </li>
            )
        }
    }


    return (
        <aside className={styles.sidebar}>
            <nav>
                <ul>
                    {navItems.map((item) => (
                        renderItem(item)
                    ))}
                </ul>
            </nav>

        </aside>
    );
};


