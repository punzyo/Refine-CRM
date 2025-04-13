import LanguageIcon from '@mui/icons-material/Language'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useGetLocale, useSetLocale, useTranslate } from '@refinedev/core'

export const LanguageSelector = () => {
  const t = useTranslate()
  const setLocale = useSetLocale()
  const getLocale = useGetLocale()

  const currentLocale = getLocale()

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLocale(event.target.value as string)
  }

  return (
    <FormControl size="small" variant="outlined">
      <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageIcon sx={{ mr: 1 }} />
        {t('Language')}
      </InputLabel>
      <Select
        value={currentLocale}
        onChange={handleChange}
        label={t('Language')}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="zh">繁體中文</MenuItem>
      </Select>
    </FormControl>
  )
}
