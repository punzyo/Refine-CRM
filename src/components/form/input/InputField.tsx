import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { getOptionalPatternRule } from '../../../utils/form/getOptionalPatternRule'
interface InputFieldProps {
  formMethods: any
  name: string
  label: string
  multiline?: boolean
  rows?: number
  error?: string
  sx?: any
  rules?: any
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputField = ({
  formMethods,
  name,
  label,
  multiline = false,
  rows,
  sx,
  rules,
  type = 'text',
  onChange,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const effectiveType = type === 'password' ? (showPassword ? 'text' : 'password') : type
  return (
    <Controller
      name={name}
      control={formMethods.control}
      rules={rules && getOptionalPatternRule(rules)}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={effectiveType}
          sx={sx}
          label={label}
          value={field.value ?? ''}
          onChange={(e) => {
            field.onChange(e)
            onChange?.(e)
          }}
          required={!!rules?.required}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            input: {
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
            },
          }}
        />
      )}
    />
  )
}

export default InputField
