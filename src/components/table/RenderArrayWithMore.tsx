import React, { useState } from 'react'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Chip, Button, Stack, Dialog, DialogTitle, DialogContent, Box } from '@mui/material'

const RenderArrayWithMore: React.FC<GridRenderCellParams> = (props) => {
  const { row, colDef } = props
  const field = colDef.field
  const arrayValue = row[field]

  if (!Array.isArray(arrayValue) || arrayValue.length === 0) {
    return null
  }

  const MAX_DISPLAY = 3
  const [open, setOpen] = useState(false)

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(false)
  }

  const displayedItems = arrayValue.slice(0, MAX_DISPLAY)
  const hasMore = arrayValue.length > MAX_DISPLAY

  return (
    <>
      <Stack direction="row" spacing={1}>
        {displayedItems.map((item: string, index: number) => (
          <Chip key={index} label={item} size="small" />
        ))}
        {hasMore && (
          <Button
            variant="outlined"
            size="small"
            onClick={handleOpen}
            sx={{ minWidth: 'unset', padding: '0 6px' }}
          >
            更多
          </Button>
        )}
      </Stack>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>完整清單</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {arrayValue.map((item: string, idx: number) => (
              <Chip key={idx} label={item} size="small" />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RenderArrayWithMore
