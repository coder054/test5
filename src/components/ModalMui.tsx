import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { CSSObject } from '@mui/system'
import { XIcon } from 'src/components/icons'

const style = {
  borderRadius: 1,
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: '#1E1F24',
  p: {
    xs: 2,
    xl: 4,
  },
  maxWidth: 'calc(100vw - 32px)',
}

type MyModalProps = {
  sx?: CSSObject
  showXIcon?: boolean
  isOpen: boolean
  onClose: (value: boolean) => void
  children: React.ReactElement
}

export const ModalMui = ({
  isOpen,
  onClose,
  children,
  sx,
  showXIcon,
}: MyModalProps) => {
  return (
    <Modal open={isOpen} onClose={() => onClose(false)}>
      <Box sx={{ ...style, ...sx }}>
        {showXIcon && (
          <button
            type="button"
            onClick={() => {
              onClose(false)
            }}
            className="absolute right-4 top-4 z-10 "
          >
            <XIcon />
          </button>
        )}
        {children}
      </Box>
    </Modal>
  )
}
