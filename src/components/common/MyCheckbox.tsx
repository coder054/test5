import { Checkbox } from '@mui/material'

export const MyCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: any
}) => {
  return (
    <Checkbox
      inputProps={{
        'aria-label': label,
      }}
      checked={checked}
      onChange={onChange}
      sx={{
        color: '#818389',
        '&.Mui-checked': {
          color: '#4654EA',
        },
      }}
    />
  )
}
