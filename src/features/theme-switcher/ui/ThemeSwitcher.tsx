import {Theme, useTheme} from '@/shared/lib/theme';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from './ThemeSwitcher.module.css';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.button}>
      {theme === Theme.LIGHT ? <FaSun /> : <FaMoon />}
    </button>
  );
};
