import { useTable, useTranslate } from '@refinedev/core'
import { List, ShowButton } from '@refinedev/mui'
import FilteredTable from '../../components/table/DataGridTable'
import RenderArrayWithMore from '../../components/table/RenderArrayWithMore'
import { generateColumns } from '../../utils/generateColumns'
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
  const t = useTranslate()

  const columns = generateColumns(data?.data || [], 'admins', t, {
    customColumns: {
      roles: {
        headerName: t(`fields.admins.roles`, 'roles'),
        renderCell: (params: any) => <RenderArrayWithMore {...params} />,
      },
    },
    actions: true,
    renderActions: (row) => <ShowButton />,
  })

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
