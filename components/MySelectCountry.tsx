/* eslint-disable @next/next/no-img-element */
import { Autocomplete, Box, styled, TextField } from '@mui/material'
import clsx from 'clsx'
import { useEffect } from 'react'

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

export const MySelectCountry = ({
  className,
  label,
  value,
  onChange,
  arrOption,
  ...rest
}: {
  className?: string
  label: string
  value?: any
  onChange?: any
  arrOption?: any
  [rest: string]: any
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let el = window.document.querySelector('.ant-form')
    if (!el) {
      return
    }

    el.classList.remove('ant-form')
  }, [])

  return (
    <div className={clsx('relative', className)} {...rest}>
      <Autocomplete
        disablePortal
        options={arrOption}
        onChange={onChange}
        value={value}
        fullWidth
        renderInput={(params) => (
          <CssTextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
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
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.name}
          </Box>
        )}
      />
    </div>
  )
}
