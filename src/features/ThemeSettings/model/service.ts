export type ThemeSettingsState = {
    isOpen: boolean;
    isCollapsed: boolean;
};

type Listener = (state: ThemeSettingsState) => void;

const listeners: Set<Listener> = new Set();

let state: ThemeSettingsState = {
    isOpen: false,
    isCollapsed: false,
};

const notify = () => {
    listeners.forEach(listener => listener(state));
};

export const themeSettingsService = {
    init() {
        state = { isOpen: false, isCollapsed: false };
    },

    subscribe(listener: Listener) {
        listeners.add(listener);
        listener(state);
        return () => {
            listeners.delete(listener);
        };
    },

    getState(): ThemeSettingsState {
        return state;
    },

    openDrawer() {
        if (!state.isOpen) {
            state = { ...state, isOpen: true };
            notify();
        }
    },

    closeDrawer() {
        if (state.isOpen) {
            state = { ...state, isOpen: false };
            notify();
        }
    },

    toggleDrawer() {
        state = { ...state, isOpen: !state.isOpen };
        notify();
    },

    toggleCollapsed() {
        state = { ...state, isCollapsed: !state.isCollapsed };
        notify();
    },

};
