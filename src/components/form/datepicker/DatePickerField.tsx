import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'
import { getOptionalPatternRule } from '../../../utils/form/getOptionalPatternRule'

interface DatePickerFieldProps {
  formMethods: any
  name: string
  label: string
  sx?: object
  validateFn?: (value: string, formMethods: any) => void
  includeTime?: boolean
  minDate?: any
  maxDate?: any
  rules?: any
}
const DatePickerField = ({
  formMethods,
  name,
  label,
  sx,
  minDate,
  maxDate,
  includeTime = false,
  rules,
}: DatePickerFieldProps) => {
  return (
    <Controller
      name={name}
      control={formMethods.control}
      rules={rules && getOptionalPatternRule(rules)}
      render={({ field, fieldState }) => {
        const PickerComponent = includeTime ? DateTimePicker : DatePicker
        return (
          <PickerComponent
            {...field}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => {
              const newValue = date ? date.toISOString() : ''
              field.onChange(newValue)
            }}
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{
              textField: {
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
                InputLabelProps: {
                  required: !!rules?.required,
                },
              },
            }}
            sx={{ flex: 1, minWidth: 180, ...sx }}
          />
        )
      }}
    />
  )
}

export default DatePickerField
