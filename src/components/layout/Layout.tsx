import { ThemedLayoutV2 } from '@refinedev/mui'
import React from 'react'
import { Outlet } from 'react-router'
import { Header } from '../header'
import tsgLogo from '/icon-32.png'
import { Box } from '@mui/material'

const Layout: React.FC = () => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={({ collapsed }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: collapsed ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: collapsed ? '0px 4px' : 0,
          }}
        >
          <Box sx={{ width: collapsed ? '100%' : '128px', pr: collapsed ? 0 : { xs: '16px' } }}>
            <img src={tsgLogo} alt="Logo" style={{ maxWidth: '100%' }} />
          </Box>
        </Box>
      )}
    >
      <Outlet />
    </ThemedLayoutV2>
  )
}

export default Layout
