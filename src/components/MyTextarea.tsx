import { TextField } from '@mui/material'

type MyTextAreaProps = {
  placeholder?: string
  value?: string
  onChange?: any
}

export const MyTextArea = ({
  placeholder,
  value,
  onChange,
}: MyTextAreaProps) => {
  return (
    <TextField
      sx={{
        '& .MuiOutlinedInput-root': {
          '& legend': {
            display: 'none',
          },
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
      rows={5}
      value={value}
      onChange={onChange}
    />
  )
}
