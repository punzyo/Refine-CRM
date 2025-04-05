import { useTable } from '@refinedev/core'
import { List } from '@refinedev/mui'
import FilteredTable from '../../components/table/DataGridTable'

const AdminList = () => {
  const {
    tableQuery: { data, isLoading, isError },
    current,
    setCurrent,
    pageSize,
    setPageSize,
  } = useTable({
    pagination: {
      pageSize: 10,
      current: 1,
    },
    syncWithLocation: false,
  })

  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: '建立時間',
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: '更新時間',
      flex: 1,
    },
  ]

  return (
    <List title="管理員列表">
      <FilteredTable
        data={data?.data || []}
        columns={columns}
        pageSize={pageSize}
        setPageSize={setPageSize}
        current={current}
        setCurrent={setCurrent}
        rowCount={data?.total || 0}
        isLoading={isLoading}
        isError={isError}
      />
    </List>
  )
}

export default AdminList
