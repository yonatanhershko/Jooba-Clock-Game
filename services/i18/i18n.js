import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../i18/en.json'
import he from '../i18/he.json'

const resources = {
  en: { translation: en },
  he: { translation: he },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default
  fallbackLng: 'en',//if theres a problem
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;