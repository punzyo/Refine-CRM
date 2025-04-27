import { Box, Stack } from '@mui/material'
import InputField from '../../components/form/input/InputField'
import RoleSelector from '../../components/form/select/RoleSelector'

const AdminForm: React.FC<{ formMethods: any; isEdit: boolean }> = ({ formMethods, isEdit }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Stack direction="column" spacing={2}>
          <InputField
            formMethods={formMethods}
            name="name"
            label="姓名"
            rules={{
              required: '請輸入姓名',
            }}
            sx={{ flex: 1, minWidth: 180 }}
          />
          <InputField
            formMethods={formMethods}
            name="email"
            label="電子郵件"
            type="email"
            rules={{
              required: '請輸入電子郵件',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: '請輸入正確的電子郵件格式',
              },
            }}
            sx={{ flex: 1, minWidth: 180 }}
          />
        </Stack>
        {!isEdit && (
          <Stack direction="column" spacing={2}>
            <InputField
              formMethods={formMethods}
              name="password"
              label="密碼"
              type="password"
              onChange={() => {
                if (formMethods.getFieldState('confirmPassword').isTouched) {
                  formMethods.trigger('confirmPassword')
                }
              }}
              rules={{
                required: '請輸入密碼',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                  message: '密碼限 8~20 個字元，需包含英文與數字',
                },
              }}
              sx={{ flex: 1, minWidth: 180 }}
            />
            <InputField
              formMethods={formMethods}
              name="confirmPassword"
              label="密碼確認"
              type="password"
              rules={{
                required: '請再次輸入密碼',
                validate: (value: string) =>
                  value === formMethods.watch('password') || '兩次輸入的密碼不一致',
              }}
              sx={{ flex: 1, minWidth: 180 }}
            />
          </Stack>
        )}
        <Stack direction="column" spacing={2}>
          <RoleSelector formMethods={formMethods} name="roleIds" label="指派角色" />
        </Stack>
      </Stack>
    </Box>
  )
}

export default AdminForm
