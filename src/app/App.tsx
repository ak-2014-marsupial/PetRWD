import { AppRouter } from '@/app/providers';
import { fontSizeService, themeService } from '@/shared/lib';
import { themeSettingsService } from '@/features/ThemeSettings';
import '@/app/styles/index.css';
import '@/app/styles/variables.css';
import { HashRouter } from 'react-router-dom';

export const App = () => {
    fontSizeService.init();
    themeService.init();
    themeSettingsService.init();
    return (
        <HashRouter>
            <AppRouter />
        </HashRouter>
    );
};

