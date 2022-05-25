import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { styled, TextField } from '@mui/material'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { getToday } from 'src/hooks/functionCommon'
import { ChevronLeft as ChervonLeftIcon } from 'src/icons/chevron-left'
import { ChevronRight as ChervonRightIcon } from 'src/icons/chevron-right'
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

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
      lineHeight: '25px',
    },

    '& fieldset': {
      borderColor: '#484A4D',
      borderRadius: '8px',
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

type MyDatePickerProps = Partial<{
  size: 'small' | 'medium'
  className: string
  label: string
  errorMessage: string
  value: Date | string | null | number
  adjustable: boolean
  onChange: (value: string) => void
  maxDate: any
  minDate: any
  readOnly: boolean
}>

export const MyDatePicker = ({
  className,
  label,
  size,
  value,
  maxDate,
  minDate,
  adjustable,
  errorMessage,
  onChange,
  readOnly,
  ...rest
}: MyDatePickerProps) => {
  const [currentValue, setCurrentValue] = useState<string | Date | number>()

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChangeDate = (type: 'inc' | 'dec') => {
    const initial = dayjs(currentValue)
      .add(type === 'inc' ? 1 : -1, 'day')
      .toString()
    setCurrentValue(initial)
    onChange && onChange(initial)
  }

  const handleChange = (value: any) => {
    onChange && onChange(value)
  }

  return (
    <div className={clsx('relative flex items-center space-x-2', className)}>
      {adjustable && (
        <button type="button" onClick={() => handleChangeDate('dec')}>
          <ChervonLeftIcon
            className="hover:text-[#09E099] cursor-pointer duration-150"
            fontSize="medium"
          />
        </button>
      )}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          readOnly={readOnly}
          value={currentValue}
          inputFormat="dd/MM/yyyy"
          onChange={handleChange}
          maxDate={maxDate ? maxDate : null}
          minDate={minDate ? minDate : null}
          renderInput={(params) => (
            <CssTextField fullWidth size={size} {...params} />
          )}
          {...rest}
        />
      </LocalizationProvider>
      {adjustable && (
        <button
          className={clsx(
            dayjs(currentValue).add(1, 'day').isBefore(dayjs(getToday()))
              ? 'block'
              : 'hidden'
          )}
          type="button"
          onClick={() => handleChangeDate('inc')}
        >
          <ChervonRightIcon
            className="hover:text-[#09E099] cursor-pointer duration-150"
            fontSize="medium"
          />
        </button>
      )}
      {errorMessage && (
        <p className="text-[#D60C0C] text-[14px]">{errorMessage}</p>
      )}
    </div>
  )
}
