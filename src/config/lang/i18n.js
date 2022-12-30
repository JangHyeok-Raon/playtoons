import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationJp from "./translation.ja.json";
import translationKo from "./translation.ko.json";
import translationEn from "./translation.en.json";

const resource = {
  'ja-JP': {
    translation: translationJp,
  },
  'ko-KR': {
    translation: translationKo,
  },
  'en-US': {
    translation: translationEn,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: "ja-JP",
  fallbackLng: {
    'en-US':['en-US'],
    'ko-KR':['ko-KR'],
    default:['ja-JP']
},
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: '.', // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false
  }
});

export default i18n;