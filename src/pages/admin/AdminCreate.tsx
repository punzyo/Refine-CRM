import { Create } from '@refinedev/mui'
import AdminForm from './AdminForm'
import { useCustomCreate } from '../../utils/hooks/useCreateAdmin'
import { useForm } from '@refinedev/react-hook-form'
import { useNavigate } from 'react-router'
import { normalizeAdminFormPayload } from '../../utils/form/normalizeAdminFormPayload'
export default function AdminCreate() {
  const navigate = useNavigate()
  const { handleCreate, isLoading } = useCustomCreate()

  const formMethods = useForm()
  return (
    <Create
      title="新增管理員"
      saveButtonProps={{
        children: '建立管理員',
        onClick: formMethods.handleSubmit(async () => {
          const payload = formMethods.getValues()
            const normalizedPayload = normalizeAdminFormPayload({payload, isEdit:false})
            const success = await handleCreate({
              resource: 'admin',
              values: normalizedPayload,
              onSuccess: () => navigate('/members'),
            })
        }),
        disabled: isLoading,
      }}
    >
      <AdminForm formMethods={formMethods} isEdit={false} />
    </Create>
  )
}
