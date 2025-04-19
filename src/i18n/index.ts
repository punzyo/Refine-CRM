import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { zh } from './zh';
import { en } from './en';

i18n.use(initReactI18next).init({
  resources : { zh, en },
  lng       : localStorage.getItem('lang') ?? 'zh',  
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;        
