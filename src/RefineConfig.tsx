import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import routerBindings from '@refinedev/react-router'
import dataProvider from '@refinedev/simple-rest'
import { authProvider } from './authProvider'
import resources from './resource'
import { ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/mui'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const API_URL = 'http://localhost:3001'

  return (
    <Refine
      dataProvider={dataProvider(API_URL)}
      notificationProvider={useNotificationProvider}
      authProvider={authProvider}
      routerProvider={routerBindings}
      resources={resources}
      Layout={ThemedLayoutV2}
      Sider={ThemedSiderV2}
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
