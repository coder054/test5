import { MenuItem, styled, TextField } from '@mui/material'
import clsx from 'clsx'

const CssTextField = styled(TextField)({
  '& label': {
    color: 'rgba(129, 131, 137, 1)',
    marginLeft: '4px',
  },
  '& label.Mui-focused': {
    color: '#5048E5',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#ffffff',
      fontSize: '16px',
      lineHeight: '24px',
    },

    '& fieldset': {
      borderColor: '#484A4D', // border normal
      borderRadius: '8px', // border normal
      padding: '17px 12px 15px 12px',
      color: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#484A4D',
      color: '#ffffff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5048E5',
      color: '#ffffff',
    },
  },
  '& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
    color: '#ffffff',
    '& .Mui-selected': {
      backgroundColor: '#FFFFFF',
      color: '#ff0000',
    },
  },

  '.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root': {
    color: '#ffffff',
  },
})

export const MySelect = ({
  className,
  label,
  value,
  addNew,
  titleAddNew,
  linkAddNew,
  onChange,
  arrOption,
  setOpenModal,
  ...rest
}: {
  className?: string
  label: string
  value?: string
  addNew?: boolean
  titleAddNew?: string
  linkAddNew?: string
  onChange?: any
  arrOption: { value: number | string; label: string }[]
  [rest: string]: any
  setOpenModal?: Function
}) => {
  const handleAddNew = () => {
    setOpenModal && setOpenModal(true)
  }

  return (
    <div className={clsx('relative', className)}>
      <CssTextField
        value={value}
        onChange={onChange}
        fullWidth
        select
        label={label}
        inputProps={{
          autoComplete: 'off',
        }}
      >
        {addNew ? (
          <p className="text-base text-[#FFFFFF] pl-[16px] pt-[5px] pb-[5px]">
            {titleAddNew}{' '}
            <span className="underline cursor-pointer" onClick={handleAddNew}>
              {linkAddNew}
            </span>
          </p>
        ) : null}
        {arrOption.map((option) => (
          <MenuItem
            className="text-white"
            key={`${option.value}-{option.label}`}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </CssTextField>
    </div>
  )
}
