import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import routerBindings from '@refinedev/react-router'
import dataProvider from '@refinedev/simple-rest'
import { authProvider } from './authProvider'
import resources from './resource'
import axiosInstance from './axiosInstance'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const API_URL = 'http://localhost:3001'

  return (
    <Refine
      dataProvider={dataProvider(API_URL,axiosInstance)}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
      resources={resources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
      }}
    >
      {children}
    </Refine>
  )
}

export default RefineConfig
