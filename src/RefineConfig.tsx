import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import routerBindings from '@refinedev/react-router'
import dataProvider from '@refinedev/simple-rest'
import { authProvider } from './authProvider'
import resources from './resource'
import axiosInstance from './axiosInstance'
import { customDataProvider } from './customDataProvider'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const API_URL = 'http://localhost:3001'

  return (
    <Refine
      dataProvider={customDataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
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
