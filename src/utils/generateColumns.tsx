import { GridColDef } from '@mui/x-data-grid'
import React from 'react'

export interface ColumnOptions {
  actions?: boolean
  renderActions?: (row: any) => React.ReactNode
  customColumns?: Partial<Record<string, Partial<GridColDef>>>
}

export function generateColumns(
  data: any[],
  resource: string,
  t: (key: string, defaultValue?: string) => string,
  options?: ColumnOptions
): GridColDef[] {
  if (!data || data.length === 0) return []

  const sampleRow = data[0]
  const fields = Object.keys(sampleRow)

  const columns: GridColDef[] = fields.map((field) => {
    const custom: Partial<GridColDef> = options?.customColumns?.[field] || {}
    return {
      field,
      headerName: custom.headerName || t(`fields.${resource}.${field}`, field),
      width: custom.width || 150,
      renderCell:
        custom.renderCell ||
        ((params: any) => {
          const rawValue = params.row[field]
          if (Array.isArray(rawValue)) {
            return rawValue.map((item) => t(`values.${resource}.${field}.${item}`, item)).join(', ')
          }
          return t(`values.${resource}.${field}.${rawValue}`, rawValue)
        }),
      ...custom,
    } as GridColDef
  })

  if (options?.actions) {
    columns.push({
      field: 'actions',
      headerName: t(`fields.${resource}.actions`, '操作'),
      width: 120,
      renderCell: (params) => {
        const row = params.row
        return options.renderActions ? options.renderActions(row) : null
      },
    })
  }

  return columns
}
