import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { useNavigate } from 'react-router'
import { normalizeAdminFormPayload } from '../../utils/form/normalizeAdminFormPayload'
import { useRequestAction } from '../../utils/hooks/useRequestAction'
import AdminForm from './AdminForm'
export default function AdminCreate() {
  const navigate = useNavigate()
  const { handleAction, isLoading } = useRequestAction()

  const formMethods = useForm()
  return (
    <Create
      title="新增管理員"
      saveButtonProps={{
        children: '建立管理員',
        onClick: formMethods.handleSubmit(async () => {
          const payload = formMethods.getValues()
          const normalizedPayload = normalizeAdminFormPayload({ payload, isEdit: false })
          const success = await handleAction({
            method: 'create',
            resource: 'admin',
            values: normalizedPayload,
            onSuccess: () => navigate('/admin'),
          })
        }),
        disabled: isLoading,
      }}
    >
      <AdminForm formMethods={formMethods} isEdit={false} />
    </Create>
  )
}
