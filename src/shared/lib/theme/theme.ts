export const Theme = {
    LIGHT: 'app_light_theme',
    DARK: 'app_dark_theme',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export const LOCAL_STORAGE_THEME_KEY='theme';

type Listener = (theme: Theme) => void;

const listeners: Set<Listener> = new Set();

export const themeService = {
    get(): Theme {
        return localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
    },

    set(theme: Theme) {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        listeners.forEach(listener => listener(theme));
    },

    subscribe(listener: Listener) {
        listeners.add(listener);
        return () => { // unsubscribe
            listeners.delete(listener);
        };
    },

    init() {
        this.set(this.get());
    },

    toggle() {
        const newTheme = this.get() === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        this.set(newTheme);
    }
};
