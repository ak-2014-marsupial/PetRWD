import { AppRouter } from '@/app/providers';
import { fontSizeService, themeService, notificationService } from '@/shared/lib';
import { themeSettingsService } from '@/features/ThemeSettings';
import '@/app/styles/index.css';
import '@/app/styles/variables.css';
import { HashRouter } from 'react-router-dom';
import {NotificationContainer} from "@/shared/ui";

export const App = () => {
    fontSizeService.init();
    themeService.init();
    themeSettingsService.init();
    notificationService.init();
    return (
        <HashRouter>
            <AppRouter />
            <NotificationContainer />
        </HashRouter>
    );
};

