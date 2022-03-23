import { styled, TextField, InputProps } from '@mui/material'
import clsx from 'clsx'

const CssTextField = styled(TextField)({
  '& label': {
    color: 'rgba(129, 131, 137, 1)',
    marginLeft: '4px',
  },
  '& label.Mui-focused': {
    color: '#ffffff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#ffffff',
      fontSize: '16px',
      lineHeight: '25px',
    },

    '& fieldset': {
      borderColor: '#484A4D',
      borderRadius: '8px',
      padding: '12px 12px 12px 12px',
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

export const MyNormalInput = ({
  className,
  inputOptions,
  label,
  value,
  onChange,
  placeholder,
  type,
  ...rest
}: {
  inputOptions?: any
  className?: string
  label?: string
  value?: string | number
  onChange?: any
  placeholder?: string
  type?: 'text' | 'password' | 'number'
}) => {
  return (
    <div className={clsx('relative w-full', className)}>
      <CssTextField
        placeholder={placeholder}
        onChange={onChange}
        inputProps={inputOptions}
        value={value}
        label={label}
        type={type}
        fullWidth
        {...rest}
      />
    </div>
  )
}
