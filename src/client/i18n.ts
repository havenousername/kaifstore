import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ns1ru from './locales/ru/common.json';
import ns1en from './locales/en/common.json';

// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    ns1: ns1en,
  },
  ru: {
    ns1: ns1ru,
  },
} as const;

i18next.use(initReactI18next).init({
  resources,
  defaultNS,
  ns: ['ns1'],
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});
