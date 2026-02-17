import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import css from './AppShell.module.css';

interface AppShellProps {
  headerSlot: ReactNode;
  sidebarSlot: ReactNode;
  footerSlot: ReactNode;
}

export const AppShell = ({
  headerSlot,
  sidebarSlot,
  footerSlot,
}: AppShellProps) => {
  return (
    <div className={css.appShell}>
      {headerSlot}
      <main className={css.main}>
        {sidebarSlot}
        <div className={css.content}>
          <Outlet />
        </div>
      </main>
      {footerSlot}
    </div>
  );
};
