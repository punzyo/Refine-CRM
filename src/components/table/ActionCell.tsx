import { Stack } from '@mui/material'
import { useDelete, useNavigation } from '@refinedev/core'
import { ShowButton } from '@refinedev/mui'
import React from 'react'
import ActionMenu from './ActionMenu'

interface ActionMenuItem {
  label: string
  onClick: (row: any) => void
  sx?: any
}

interface ActionCellProps {
  row: any
  resource: string
  showButton?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
  onShowClick?: (row: any) => void
  customMenuItems?: ActionMenuItem[]
}

export const ActionCell: React.FC<ActionCellProps> = ({
  row,
  resource,
  showButton = true,
  disableEdit = false,
  disableDelete = false,
  onShowClick,
  customMenuItems = [],
}) => {
  const { show, edit } = useNavigation()
  const { mutate: deleteOne } = useDelete()

  const handleEdit = () => edit(resource, row.id)

  const handleDelete = () => {
    if (window.confirm('確定要刪除這筆資料嗎？')) {
      deleteOne({ resource, id: row.id })
    }
  }

  const defaultMenuItems: ActionMenuItem[] = [
    !disableEdit && {
      label: '編輯',
      onClick: handleEdit,
    },
    !disableDelete && {
      label: '刪除',
      onClick: handleDelete,
      sx: { color: 'error.main' },
    },
  ].filter(Boolean) as ActionMenuItem[]

  const finalMenuItems = [...defaultMenuItems, ...customMenuItems]

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      {showButton && (
        <ShowButton
          size="small"
          recordItemId={row.id}
          onClick={() => {
            onShowClick ? onShowClick(row) : show(resource, row.id)
          }}
        />
      )}

      <ActionMenu row={row} menuItems={finalMenuItems} />
    </Stack>
  )
}

export default ActionCell
