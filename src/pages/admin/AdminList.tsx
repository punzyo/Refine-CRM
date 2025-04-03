import { useList } from '@refinedev/core'
import { List } from '@refinedev/mui'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

const AdminList = () => {
  const { data, isLoading } = useList({ resource: 'admin' })

  if (isLoading) return <div>Loading...</div>

  return (
    <List>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>建立時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{new Date(admin.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </List>
  )
}

export default AdminList
