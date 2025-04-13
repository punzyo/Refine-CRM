import { I18nProvider } from '@refinedev/core'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { zh } from './zh'

const resources = {
  zh,
  en,
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export const i18nProvider: I18nProvider = {
  translate: (key: string, params?: any) => i18n.t(key, params) as string,
  changeLocale: (lang: string) => i18n.changeLanguage(lang),
  getLocale: () => i18n.language,
}
