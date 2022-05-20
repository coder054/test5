import { TextField, TextFieldProps } from '@mui/material'

type MyTextAreaProps = TextFieldProps & {
  placeholder?: string
  value?: string
  label?: string
  onChange?: any
  disabled?: boolean
}

export const TextAreaComment = ({
  placeholder,
  value,
  label,
  onChange,
  disabled,
  ...rest
}: MyTextAreaProps) => {
  return (
    <TextField
      sx={{
        '& .css-1eawneq-MuiInputBase-input-MuiOutlinedInput-input': {
          marginRight: '56px',
        },
        '& .MuiOutlinedInput-root': {
          // '& legend': {
          //   display: 'none',
          // },
          '& textarea::placeholder': {
            color: '#6B7280',
            fontWeight: '400',
            fontSize: '16px',
          },
        },
        '& MuiOutlinedInput-input': {
          color: '#ffffff',
          fontSize: 12,
        },
      }}
      placeholder={placeholder}
      fullWidth
      multiline
      maxRows={3}
      value={value}
      onChange={onChange}
      label={label}
      variant="outlined"
      disabled={disabled}
      {...rest}
    />
  )
}
