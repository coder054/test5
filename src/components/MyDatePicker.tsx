import { DesktopDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { styled, TextField } from '@mui/material'
import clsx from 'clsx'
import * as React from 'react'

const CssTextField = styled(TextField)({
  '& label': {
    color: 'rgba(129, 131, 137, 1)',
    marginLeft: '4px',
  },
  '& label.Mui-focused': {
    // color: '#5048E5',
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

export const MyDatePicker = ({
  className,
  label,
  val,
  errorMessage,
  onChange,
  type,
  ...rest
}: {
  className?: string
  label: string
  errorMessage?: string
  val?: Date | string | null
  onChange?: any
  [rest: string]: any
}) => {
  return (
    <div className={clsx('relative', className)}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          value={val ? val : null}
          inputFormat="dd/MM/yyyy"
          onChange={onChange}
          renderInput={(params) => <CssTextField fullWidth {...params} />}
          {...rest}
        />
      </LocalizationProvider>

      {errorMessage && (
        <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
      )}
    </div>
  )
}
