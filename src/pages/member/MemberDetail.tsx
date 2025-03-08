import { Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import { Show } from '@refinedev/mui'

const MemberDetail = () => {
  const { queryResult } = useShow()

  const data = queryResult?.data?.data || { id: 1, name: '測試用戶', email: 'test@example.com' }
  const isLoading = queryResult?.isLoading ?? false

  if (isLoading) return <div>Loading...</div>

  return (
    <Show>
      <Typography variant="h5">會員姓名: {data.name}</Typography>
      <Typography variant="h6">Email: {data.email}</Typography>
    </Show>
  )
}

export default MemberDetail
