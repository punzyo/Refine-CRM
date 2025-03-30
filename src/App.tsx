import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { Authenticated } from '@refinedev/core'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { RefineSnackbarProvider } from '@refinedev/mui'
import { DocumentTitleHandler, RefineRoutes, UnsavedChangesNotifier } from '@refinedev/react-router'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ColorModeContextProvider } from './contexts/color-mode'
import Login from './pages/login'
import RefineConfig from './RefineConfig'
import { Navigate } from 'react-router'
import Layout from './components/layout/Layout'
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
                  <Route path="/login" element={<Login />} />
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
