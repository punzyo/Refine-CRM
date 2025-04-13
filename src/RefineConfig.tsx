import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import routerBindings from '@refinedev/react-router'
import { authProvider } from './authProvider'
import { customDataProvider } from './customDataProvider'
import resources from './resource'
import { i18nProvider } from './i18n/i18nProvider'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
