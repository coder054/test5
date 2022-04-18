import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { CSSObject } from '@mui/system'

const style = {
  borderRadius: 1,
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#1E1F24',
  p: 4,
}

type MyModalProps = {
  sx?: CSSObject
  isOpen: boolean
  onClose: (value: boolean) => void
  children: React.ReactElement
}

export const ModalMui = ({ isOpen, onClose, children, sx }: MyModalProps) => {
  return (
    <Modal open={isOpen} onClose={() => onClose(false)}>
      <Box sx={{ ...style, ...sx }}>{children}</Box>
    </Modal>
  )
}
