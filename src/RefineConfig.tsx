import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/mui'
import dataProvider from '@refinedev/simple-rest'
import routerBindings from '@refinedev/react-router'
import resources from './resource'

const RefineConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    console.log("✅ routerProvider 已加載:", routerBindings);

  return (
    <Refine
      dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
      notificationProvider={useNotificationProvider}
      //   authProvider={authProvider} // 如果有權限管理
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
