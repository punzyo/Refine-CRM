import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, IconButton } from '@mui/material'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'

interface DataGridToolBarProps {
  isDataHidden?: boolean
  toggleDataHidden?: () => void
  isShowDataHidden?: boolean
}

const DataGridToolBar: React.FC<DataGridToolBarProps> = ({
  isDataHidden,
  toggleDataHidden,
  isShowDataHidden = false,
}) => {
  return (
    <GridToolbarContainer
      sx={{
        padding: '8px',
        borderBottom: '1px solid rgba(200, 200, 200, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GridToolbarExport
          csvOptions={{
            utf8WithBom: true,
          }}
        />
        <GridToolbarColumnsButton />
      </Box>
      {isShowDataHidden && (
        <IconButton onClick={toggleDataHidden} sx={{ fontSize: 24 }}>
          {isDataHidden ? (
            <VisibilityOffIcon fontSize="inherit" />
          ) : (
            <VisibilityIcon fontSize="inherit" />
          )}
        </IconButton>
      )}
    </GridToolbarContainer>
  )
}

export default DataGridToolBar
