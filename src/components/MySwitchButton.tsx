import { Switch } from '@mui/material'

type MySwitchButtonProps = {
  checked?: boolean
  name?: string
  onChange?: any
}

export const MySwitchButton = ({
  onChange,
  checked,
  name,
}: MySwitchButtonProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      name={name}
      sx={{
        '& > .MuiSwitch-track': { backgroundColor: '#fff' },
      }}
    />
  )
}
