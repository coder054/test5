import { styled, TextField } from '@mui/material'

import clsx from 'clsx'
import { useState } from 'react'

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

export const MyInput = ({
  className,
  label,
  value,
  onChange,
  type,
  password,
  ...rest
}: {
  className?: string
  label: string
  value: string
  onChange: any
  password?: boolean
  [rest: string]: any
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={clsx('relative', className)}>
      <CssTextField
        fullWidth
        label={label}
        id="custom-css-outlined-input"
        inputProps={{
          autoComplete: 'off',
        }}
        type={showPassword || !password ? 'text' : 'password'}
      />
      {password && (
        <svg
          onClick={() => {
            setShowPassword(!showPassword)
          }}
          className="absolute right-[12px] top-1/2 transform -translate-y-1/2 cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"
            fill="#6B7280"
          />
        </svg>
      )}
    </div>
  )
}
