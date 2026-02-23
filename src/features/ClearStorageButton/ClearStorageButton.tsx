import {notificationService} from '@/shared/lib';
import css from './ClearStorageButton.module.css'; // Keep the style import

export const ClearStorageButton = ({label}: { label?: string }) => {
    // If label is not provided, use a default, as in the original component
    const displayLabel = label || "Clear Cache";

    const handleClear = () => {
        notificationService.warning(
            "Are you sure you want to clear ALL local settings? This action cannot be undone.",
            0, // Duration 0 means it won't auto-dismiss, stays until action
            [
                {
                    label: "Yes, clear it",
                    callback: () => {
                        localStorage.clear();
                        notificationService.success("All local settings cleared!", 1500);
                        // Reload after a short delay to allow notification to show
                        setTimeout(() => window.location.reload(), 500); 
                    },
                },
                {
                    label: "No, keep it",
                    callback: () => {
                        notificationService.info("Action cancelled.", 1500);
                    },
                },
            ]
        );
    };

    return (
        <button
            onClick={handleClear}
            className={css.ClearStoreButton} // Keep original className
        >
            {displayLabel}
        </button>
    );
};
