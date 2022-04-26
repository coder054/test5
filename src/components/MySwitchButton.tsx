import { Switch, SwitchProps } from '@mui/material'

type MySwitchButtonProps = SwitchProps & {
  checked?: boolean
  name?: string
  onChange?: any
}

export const MySwitchButton = ({
  onChange,
  checked,
  name,
  ...rest
}: MySwitchButtonProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      name={name}
      sx={{
        '& > .MuiSwitch-track': { backgroundColor: '#fff' },
      }}
      {...rest}
    />
  )
}
