import { GitHubBanner } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { RefineSnackbarProvider } from '@refinedev/mui'
import { DocumentTitleHandler, RefineRoutes, UnsavedChangesNotifier } from '@refinedev/react-router'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ColorModeContextProvider } from './contexts/color-mode'
import RefineConfig from './RefineConfig'
import { Navigate } from 'react-router'
import Dashboard from './pages/Dashboard'
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
                <Route path="/" element={<Dashboard/>} />
                  <Route path="/*" element={<RefineRoutes />} />
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
