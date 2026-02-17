const LOCAL_STORAGE_FONT_SIZE_KEY = 'user-font-size';
export const FONT_SIZE_DEFAULT_SIZE = 16;
export const FONT_SIZE_MIN_SIZE = 12;
export const FONT_SIZE_MAX_SIZE = 18;

export const fontSizeService = {
    // Встановлює розмір та зберігає його
    set(size: number) {
        const validatedSize = Math.max(FONT_SIZE_MIN_SIZE, Math.min(FONT_SIZE_MAX_SIZE, size));

        // Встановлюємо font-size саме на тег <html>
        // Це змусить всі rem-одиниці перерахуватися
        document.documentElement.style.fontSize = `${validatedSize}px`;

        localStorage.setItem(LOCAL_STORAGE_FONT_SIZE_KEY, validatedSize.toString());
    },

    // Отримує значення (з бази або дефолт)
    get(): number {
        const saved = localStorage.getItem(LOCAL_STORAGE_FONT_SIZE_KEY);
        return saved ? parseInt(saved, 10) : FONT_SIZE_DEFAULT_SIZE;
    },

    // Викликається один раз при старті додатка
    init() {
        this.set(this.get());
    }
};