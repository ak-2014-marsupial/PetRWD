import { createJiti } from 'jiti';
import autoprefixer from 'autoprefixer';
import postcssSimpleVars from 'postcss-simple-vars';

const jiti = createJiti(import.meta.url);
const { APP_CONFIG } = await jiti.import('./src/app/config/appConfig.ts');

function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        // Заменяем точку на двойное подчеркивание __
        const pre = prefix.length ? prefix + '__' : '';
        if (obj[k] !== null && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}
const flatConfig = flattenObject(APP_CONFIG);
// console.log('--- POSTCSS KEYS START ---');
// console.log(Object.keys(flatConfig)); // Выведет список всех доступных имен переменных
// console.log('--- POSTCSS KEYS END ---');

export default {
    plugins: [
        postcssSimpleVars({
            variables: flattenObject(APP_CONFIG),
            // Включаем silent режим, чтобы увидеть, если переменная не найдена
            silent: false
        }),
        autoprefixer()
    ]
};