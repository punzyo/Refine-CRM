import LanguageIcon from '@mui/icons-material/Language'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useGetLocale, useSetLocale, useTranslate } from '@refinedev/core'
import { useEffect, useState } from 'react'

export const LanguageSelector = () => {
  const t = useTranslate()
  const setLocale = useSetLocale()
  const getLocale = useGetLocale()

  const [selectedLocale, setSelectedLocale] = useState(getLocale())

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as string
    setSelectedLocale(newLocale)
    setLocale(newLocale)
  }

  return (
    <FormControl size="small" variant="outlined">
      <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageIcon sx={{ mr: 1 }} />
        {t('common.Language')}
      </InputLabel>
      <Select
        value={selectedLocale}
        onChange={handleChange}
        label={t('common.Language')}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="zh">繁體中文</MenuItem>
      </Select>
    </FormControl>
  )
}
