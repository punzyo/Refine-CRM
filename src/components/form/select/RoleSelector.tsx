import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material'
import { useList } from '@refinedev/core'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

interface Role {
  id: string
  name: string
}

interface RoleSelectorProps {
  formMethods: any
  name?: string
  label?: string
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  formMethods,
  name = 'roleIds',
  label = '指派角色',
}) => {
  const [roles, setRoles] = useState<Role[]>([])
  const { data, isLoading } = useList<Role>({
    resource: 'admin/roles',
    pagination: { mode: 'off' },
  })

  useEffect(() => {
    if (data?.data) {
      setRoles(data.data)
    }
  }, [data])
  if (isLoading) return <CircularProgress size={24} />
  console.log(roles)

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" sx={{ mb: 1 }}>
        {label}
      </FormLabel>
      <Controller
        control={formMethods.control}
        name={name}
        defaultValue={[]}
        render={({ field }) => (
          <FormGroup row>
            {roles &&
              roles.map((role) => (
                <FormControlLabel
                  key={role.id}
                  control={
                    <Checkbox
                      checked={field.value.includes(role.id)}
                      onChange={(e) => {
                        const checked = e.target.checked
                        if (checked) {
                          field.onChange([...field.value, role.id])
                        } else {
                          field.onChange((field.value as string[]).filter((id) => id !== role.id))
                        }
                      }}
                    />
                  }
                  label={role.name}
                />
              ))}
          </FormGroup>
        )}
      />
    </FormControl>
  )
}

export default RoleSelector
