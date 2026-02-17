import { Theme } from './theme';
import { APP_CONFIG } from '@/app/config/appConfig';

interface ThemeVariables {
  h: number;
  s: number;
  lBase: number;
  lStep: number;
  accS: number;
  accL: number;
  textS: number;
  textL: number;
  textSStep: number;
  textLStep: number;
}

export const themeVarsService = {
  get(theme: Theme): ThemeVariables {
    return APP_CONFIG.THEME_VARS[theme];
  },

  set(
    h: number,
    s: number,
    lBase: number,
    lStep: number,
    accS: number,
    accL: number,
    textS: number,
    textL: number,
    textSStep: number,
    textLStep: number,
  ) {
    document.body.style.setProperty('--_h', String(h));
    document.body.style.setProperty('--_s', `${s}%`);
    document.body.style.setProperty('--_l-base', `${lBase}%`);
    document.body.style.setProperty('--_l-step', `${lStep}%`);
    document.body.style.setProperty('--_acc-s', `${accS}%`);
    document.body.style.setProperty('--_acc-l', `${accL}%`);
    document.body.style.setProperty('--_text-s', `${textS}%`);
    document.body.style.setProperty('--_text-l', `${textL}%`);
    document.body.style.setProperty('--_text-s-step', `${textSStep}%`);
    document.body.style.setProperty('--_text-l-step', `${textLStep}%`);
  },

  clear() {
    document.body.style.removeProperty('--_h');
    document.body.style.removeProperty('--_s');
    document.body.style.removeProperty('--_l-base');
    document.body.style.removeProperty('--_l-step');
    document.body.style.removeProperty('--_acc-s');
    document.body.style.removeProperty('--_acc-l');
    document.body.style.removeProperty('--_text-s');
    document.body.style.removeProperty('--_text-l');
    document.body.style.removeProperty('--_text-s-step');
    document.body.style.removeProperty('--_text-l-step');
  },
};
