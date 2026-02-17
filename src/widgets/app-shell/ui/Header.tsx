import { type ReactNode } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  actionsSlot?: ReactNode;
}

export const Header = ({ actionsSlot }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FSD App</div>
      <div className={styles.actions}>{actionsSlot}</div>
    </header>
  );
};
