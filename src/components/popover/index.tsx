import { ReactElement } from 'react'
import Popover from '@mui/material/Popover'

interface PopoverType {
  children: ReactElement
  anchorEl?: Element
  setAnchorEl?: (value: boolean) => void
  setCheckAccount?: Function
  id?: string
}

export const BasicPopover = ({
  children,
  anchorEl,
  setAnchorEl,
  id,
  setCheckAccount,
}: PopoverType) => {
  const handleClose = () => {
    setAnchorEl && setAnchorEl(null)
    setCheckAccount && setCheckAccount('')
  }

  const open = Boolean(anchorEl)

  return (
    <Popover
      id={id && id}
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children}
    </Popover>
  )
}
