import { AppRouter } from './providers/router';
import { fontSizeService, themeService } from '@/shared/lib';
import { themeSettingsService } from '@/features/ThemeSettings';
import '@/app/styles/index.css';
import '@/app/styles/variables.css';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
    fontSizeService.init();
    themeService.init();
    themeSettingsService.init();
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AppRouter />
        </BrowserRouter>
    );
};

