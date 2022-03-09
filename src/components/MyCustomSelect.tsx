import { Autocomplete, TextField, styled } from '@mui/material'
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

type MyCustomSelectProps = {
  label: string
  renderOption?: any
  getOptionLabel?: any
  onInputChange?: any
  className?: string
  arrOptions?: any
  onChange?: any
  val?: any
  errorMessage?: string
}

export const MyCustomSelect = ({
  label,
  className,
  getOptionLabel,
  renderOption,
  onInputChange,
  arrOptions,
  onChange,
  val,
  errorMessage,
  ...rest
}: MyCustomSelectProps) => {
  return (
    <div className={clsx(className)}>
      <Autocomplete
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
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
          '& label.Mui-focused': {
            color: '#ffffff',
          },
        }}
        renderInput={(params) => <CssTextField {...params} label={label} />}
        {...rest}
      />

      {errorMessage && (
        <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
      )}
    </div>
  )
}
