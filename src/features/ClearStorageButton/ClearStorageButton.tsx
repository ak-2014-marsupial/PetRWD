import {notificationService} from '@/shared/lib';
import css from './ClearStorageButton.module.css';

export const ClearStorageButton = ({label}: { label?: string }) => {
    if (!label) label = "Clear Cache"

    const handleClear = () => {
        localStorage.clear();
        notificationService.warning("All settings have been cleared! The page will be reloaded to  apply changes.",
            3000);
        setTimeout(() => window.location.reload(), 1500);
    };

    return (
        <button
            onClick={handleClear}
            className={css.ClearStoreButton}
        >
            {label}
        </button>
    );
};
