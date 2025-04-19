import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import routerBindings from '@refinedev/react-router'
import { useEffect, useMemo, useState } from 'react'
import { authProvider } from './authProvider'
import { customDataProvider } from './customDataProvider'
import i18n from './i18n'
import resources from './resource'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState(i18n.language)

  useEffect(() => {
    const handler = (lng: string) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  const i18nProvider = useMemo(
    () => ({
      translate: (key: string, params?: any) => i18n.t(key, params) as string,
      getLocale: () => lang,
      changeLocale: (lng: string) => {
        localStorage.setItem('lang', lng) 
        return i18n.changeLanguage(lng) 
      },
    }),
    [lang]
  )

  return (
    <Refine
      dataProvider={customDataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
      i18nProvider={i18nProvider}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        reactQuery: {
          clientConfig: {
            defaultOptions: {
              queries: {
                retry: false,
              },
              mutations: {
                retry: false,
              },
            },
          },
        },
      }}
    >
      {children}
    </Refine>
  )
}

export default RefineConfig
