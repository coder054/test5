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
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5048E5',
    },
  },
})

export const MySelect = ({
  className,
  label,
  value,
  onChange,
  arrOption,
  ...rest
}: {
  className?: string
  label: string
  value: string
  onChange: any
  arrOption: { value: number | string; label: string }[]
  [rest: string]: any
}) => {
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
        {arrOption.map((option) => (
          <MenuItem key={`${option.value}-{option.label}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CssTextField>
    </div>
  )
}
