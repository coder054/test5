/* eslint-disable @next/next/no-img-element */
import { Autocomplete, Box, styled, TextField } from '@mui/material'
import clsx from 'clsx'
import {
  COUNTRY_LIST,
  optionAllCountry,
} from 'src/constants/mocks/countries.constants'
import { CountryType } from 'src/constants/types/settingsType.type'

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

export const MySelectCountry = ({
  className,
  label,
  value,
  errorMessage,
  onChange,
  isShowOptionAll = false,
  ...rest
}: {
  className?: string
  label: string
  value?: any
  errorMessage?: string
  onChange?: any
  isShowOptionAll?: boolean
  [rest: string]: any
}) => {
  return (
    <div className={clsx('relative', className)} {...rest}>
      <Autocomplete
        sx={{
          '& .MuiAutocomplete-clearIndicator': {
            ':hover': {
              backgroundColor: '#ffffff',
              color: 'black',
            },
            color: '#ffffff',
          },
        }}
        disablePortal
        options={
          isShowOptionAll ? [optionAllCountry, ...COUNTRY_LIST] : COUNTRY_LIST
        }
        onChange={onChange}
        value={value ? value : null}
        fullWidth
        renderInput={(params) => (
          <CssTextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
          />
        )}
        isOptionEqualToValue={(option: CountryType) =>
          option.name === value.name
        }
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              style={{ border: '1px solid white' }}
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.alpha2Code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.alpha2Code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.name}
          </Box>
        )}
      />

      {errorMessage && (
        <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
      )}
    </div>
  )
}
