import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enNav from './locales/en/nav.json';
import enFooter from './locales/en/footer.json';
import enLanguageSwitcher from './locales/en/languageSwitcher.json';
import enNotFound from './locales/en/notFound.json';
import enAuth from './locales/en/auth.json';
import enPages from './locales/en/pages.json';
import enTeacher from './locales/en/teacher.json';
import enAppPages from './locales/en/appPages.json';

import arCommon from './locales/ar/common.json';
import arNav from './locales/ar/nav.json';
import arFooter from './locales/ar/footer.json';
import arLanguageSwitcher from './locales/ar/languageSwitcher.json';
import arNotFound from './locales/ar/notFound.json';
import arAuth from './locales/ar/auth.json';
import arPages from './locales/ar/pages.json';
import arTeacher from './locales/ar/teacher.json';
import arAppPages from './locales/ar/appPages.json';

const resources = {
  en: {
    translation: {
      common: enCommon,
      nav: enNav,
      footer: enFooter,
      languageSwitcher: enLanguageSwitcher,
      notFound: enNotFound,
      auth: enAuth,
      pages: enPages,
      teacher: enTeacher,
      appPages: enAppPages,
    }
  },
  ar: {
    translation: {
      common: arCommon,
      nav: arNav,
      footer: arFooter,
      languageSwitcher: arLanguageSwitcher,
      notFound: arNotFound,
      auth: arAuth,
      pages: arPages,
      teacher: arTeacher,
      appPages: arAppPages,
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    }
  });

// Set direction based on language
i18n.on('languageChanged', (lng) => {
  document.body.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
});

// Initial direction
document.body.dir = i18n.dir(i18n.language);
document.documentElement.lang = i18n.language;

export default i18n;
