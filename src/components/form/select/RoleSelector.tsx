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
  const [roles, setRoles] = useState<Role[]>([]);
  const { data, isLoading } = useList<Role>({
    resource: 'admin/roles',
    pagination: { mode: 'off' },
  });

  useEffect(() => {
    if (data?.data) {
      setRoles(data.data);
    }
  }, [data]);

  if (isLoading) return <CircularProgress size={24} />;

  const selectedNames = formMethods.getValues('roleIds') ?? []; 

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend" sx={{ mb: 1 }}>
        {label}
      </FormLabel>
      <Controller
        control={formMethods.control}
        name={name}
        defaultValue={formMethods.getValues(name) ?? []} 
        render={({ field }) => (
          <FormGroup row>
            {roles.map((role) => {
              const isChecked =
                selectedNames.includes(role.name) || field.value.includes(role.id);

              return (
                <FormControlLabel
                  key={role.id}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          field.onChange([...field.value, role.id]); // 🔥 加 id
                        } else {
                          field.onChange(
                            (field.value as string[]).filter((id) => id !== role.id)
                          ); // 🔥 移除 id
                        }
                      }}
                    />
                  }
                  label={role.name}
                />
              );
            })}
          </FormGroup>
        )}
      />
    </FormControl>
  );
};


export default RoleSelector
