import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DataGridToolBar from './DataGridToolBar'

const localeText = {
  toolbarFilters: '篩選條件',
  columnMenuFilter: '篩選',
  filterOperatorContains: '包含',
  filterOperatorDoesNotContain: '不包含',
  filterOperatorEquals: '等於',
  filterOperatorDoesNotEqual: '不等於',
  filterOperatorStartsWith: '開頭為',
  filterOperatorEndsWith: '結尾為',
  filterOperatorIsEmpty: '為空',
  filterOperatorIsNotEmpty: '不為空',
  filterOperatorIsAnyOf: '其中之一',
}

interface FilteredTableProps {
  data: any[]
  columns: any[]
  isLoading?: boolean
  isError?: boolean
  emptyMessage?: string
  pageSize: number
  setPageSize: (size: number) => void
  current: number
  setCurrent: (page: number) => void
  rowCount: number
  isDataHidden?: boolean
  toggleDataHidden?: () => void
  isShowDataHidden?: boolean
}

const FilteredTable: React.FC<FilteredTableProps> = ({
  data,
  columns,
  isLoading = false,
  isError = false,
  emptyMessage = '無資料',
  pageSize,
  setPageSize,
  current,
  setCurrent,
  rowCount,
  isDataHidden,
  toggleDataHidden,
  isShowDataHidden,
}) => {
  if (!Array.isArray(columns)) return
  return (
    <Box sx={{ width: '100%' }}>
      {isLoading ? (
        <Typography align="center">載入中...</Typography>
      ) : isError ? (
        <Typography align="center">載入失敗</Typography>
      ) : data.length === 0 ? (
        <Typography align="center">{emptyMessage}</Typography>
      ) : (
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={(row) => row.id ?? row.orderId}
          localeText={localeText}
          slots={{
            toolbar: () => (
              <DataGridToolBar
                isDataHidden={isDataHidden}
                toggleDataHidden={toggleDataHidden}
                isShowDataHidden={isShowDataHidden}
              />
            ),
          }}
          paginationMode="server"
          pageSizeOptions={[10, 25, 50]}
          paginationModel={{
            page: current - 1,
            pageSize,
          }}
          onPaginationModelChange={({ page, pageSize }) => {
            setCurrent(page + 1)
            setPageSize(pageSize)
          }}
          rowCount={rowCount}
        />
      )}
    </Box>
  )
}

export default FilteredTable
