import { Autocomplete, TextField, styled } from '@mui/material'

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

export const MyCustomSelect = ({
  label,
  arrOptions,
  onChange,
  val,
}: {
  label: string
  arrOptions?: any
  onChange?: any
  val?: any
}) => {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      onChange={onChange}
      options={arrOptions}
      value={val ? val : null}
      sx={{
        '& .MuiAutocomplete-clearIndicator': {
          ':hover': {
            backgroundColor: '#ffffff',
            color: 'black',
          },
          color: '#ffffff',
        },
      }}
      renderInput={(params) => <CssTextField {...params} label={label} />}
    />
  )
}
