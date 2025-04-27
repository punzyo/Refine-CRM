import { useDataProvider, useNotification } from '@refinedev/core'
import { Edit, RefreshButton } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import AdminForm from './AdminForm'

const AdminEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  if (!id) return null
  const navigate = useNavigate()
  const { open } = useNotification()

  const formMethods = useForm({
    refineCoreProps: { queryOptions: { enabled: false } },
  })
  const dataProvider = useDataProvider()()
  const handleRefresh = async () => {
    try {
      const { data } = await dataProvider.getOne({
        resource: `admin`,
        id,
      })
      formMethods.reset(data)
    } catch (error: any) {
      open?.({
        type: 'error',
        message: '取得會員資料失敗',
        description: error?.message || '請稍後再試',
      })
    }
  }

  useEffect(() => {
    if (id) {
      handleRefresh()
    }
  }, [])

  return (
    <Edit
      title="編輯管理員"
      headerButtons={() => (
        <>
          <RefreshButton onClick={handleRefresh}>復原</RefreshButton>
        </>
      )}
      saveButtonProps={{
        children: '修改管理員資料',
        onClick: formMethods.handleSubmit(async () => {
          let formData = formMethods.getValues()
          const payload = {
            userId: formData.id,
            name: formData.name,
            email: formData.email,
            roleIds: formData.roleIds,
          };
console.log('payload', payload);

          // navigate("/members");
        }),
        // disabled: isLoading,
      }}
    >
      <AdminForm formMethods={formMethods} isEdit={true} />
    </Edit>
  )
}

export default AdminEdit
