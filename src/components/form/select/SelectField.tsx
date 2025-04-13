import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material'
import { Controller, get, useFormState } from 'react-hook-form'
import { getOptionalPatternRule } from '../../../utils/form/getOptionalPatternRule'
interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  formMethods: any
  name: string
  label: string
  options: Option[]
  sx?: object
  rules?: any
  defaultValue?: any
  disabled?: boolean
  tooltip?: React.ReactNode
}

const SelectField = ({
  formMethods,
  name,
  label,
  options,
  sx,
  rules,
  defaultValue,
  disabled,
  tooltip,
}: SelectFieldProps) => {
  const { errors } = useFormState({ control: formMethods.control })

  const fieldError = get(errors, name)
  return (
    <FormControl variant="outlined" sx={{ flex: 1, minWidth: 180, ...sx }} error={!!fieldError}>
      <InputLabel id={`${name}-label`} required={!!rules?.required}>
        {label}
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <Box component="span" sx={{ ml: 1, cursor: 'help', color: 'primary.main' }}>
              ?
            </Box>
          </Tooltip>
        )}
      </InputLabel>

      <Controller
        name={name}
        control={formMethods.control}
        defaultValue={defaultValue || ''}
        rules={rules && getOptionalPatternRule(rules)}
        render={({ field }) => {
          const safeValue = options.some((option) => option.value === field.value)
            ? field.value
            : defaultValue || ''
          return (
            <Select
              labelId={`${name}-label`}
              label={label}
              {...field}
              value={safeValue}
              onChange={(e) => {
                field.onChange(e.target.value)
                formMethods.setValue(name, e.target.value, {
                  shouldValidate: true,
                })
              }}
              disabled={disabled}
            >
              {options.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          )
        }}
      />

      <FormHelperText>{fieldError?.message}</FormHelperText>
    </FormControl>
  )
}

export default SelectField
