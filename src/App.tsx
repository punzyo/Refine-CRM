import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { Authenticated } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { RefineSnackbarProvider } from '@refinedev/mui'
import { DocumentTitleHandler, RefineRoutes, UnsavedChangesNotifier } from '@refinedev/react-router'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { LoginRedirectIfAuthenticated } from './components/auth/LoginRedirectIfAuthenticated '
import Layout from './components/layout/Layout'
import { ColorModeContextProvider } from './contexts/color-mode'
import RefineConfig from './RefineConfig'
function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <RefineConfig>
                <Routes>
                  <Route path="/login" element={<LoginRedirectIfAuthenticated />} />
                  <Route
                    path="/*"
                    element={
                      <Authenticated
                        key="auth"
                        v3LegacyAuthProviderCompatible={true}
                        fallback={<Navigate to="/login" />}
                      >
                        <Layout />
                        <RefineRoutes />
                      </Authenticated>
                    }
                  />
                </Routes>
                <RefineKbar />
              </RefineConfig>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
