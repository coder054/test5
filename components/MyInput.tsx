import { styled, TextField } from '@mui/material'

import clsx from 'clsx'
import { useEffect, useState } from 'react'

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

export const MyInput = ({
  className,
  label,
  value,
  onChange,
  type,
  password,
  isDisabled,
  isNeedValidate,
  isValidating,
  ...rest
}: {
  className?: string
  label: string
  value?: string
  onChange?: any
  password?: boolean
  [rest: string]: any
  isDisabled?: boolean
  isNeedValidate?: boolean
  isValidating?: boolean
}) => {
  const [showPassword, setShowPassword] = useState(false)

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
    <div>
      <div className={clsx('relative', className)}>
        <CssTextField
          {...rest}
          value={value}
          onChange={onChange}
          fullWidth
          label={label}
          id="custom-css-outlined-input"
          autoComplete="current-password"
          type={showPassword || !password ? 'text' : 'password'}
        />
        <div
          onClick={() => {
            setShowPassword(!showPassword)
          }}
        >
          {password && showPassword ? (
            <svg
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
          ) : null}
          {password && !showPassword ? (
            <svg
              className="absolute right-[12px] top-1/2 transform -translate-y-1/2 cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.999623 11.5352C1.07429 11.6863 1.15366 11.8356 1.22362 11.9896C1.97263 13.6393 3.03736 15.0476 4.43132 16.2281C4.48188 16.1838 4.53127 16.1454 4.57536 16.1012C5.46312 15.2111 6.34794 14.3181 7.23982 13.4322C7.34388 13.3289 7.3527 13.2468 7.30743 13.1152C6.3109 10.2255 8.03116 7.1734 11.016 6.54185C11.905 6.35416 12.7845 6.41613 13.6405 6.72836C13.7851 6.78089 13.8798 6.76968 13.995 6.65164C14.6071 6.02422 15.2303 5.40803 15.8493 4.7877C15.894 4.74284 15.9352 4.69444 16.0181 4.60414C15.4178 4.44655 14.8593 4.26476 14.2866 4.15497C11.3682 3.59603 8.60732 4.05641 6.0434 5.56031C3.83752 6.85408 2.22132 8.69913 1.17953 11.0459C1.12544 11.1681 1.05959 11.2855 0.999623 11.4047C0.999623 11.449 0.999623 11.4921 0.999623 11.5352Z"
                fill="#818389"
              />
              <path
                d="M3.06913 20.2534C3.45951 20.6513 3.87106 21.0709 4.29259 21.5C4.34492 21.4504 4.40136 21.3985 4.45545 21.3442C5.46432 20.3308 6.47437 19.3191 7.47854 18.301C7.59083 18.1871 7.67902 18.1676 7.8307 18.226C9.49687 18.8688 11.2242 19.1226 12.9991 18.9579C16.215 18.6598 18.8889 17.2781 21.0089 14.8275C21.8479 13.8577 22.4952 12.7682 22.9797 11.5812C23.0079 11.5122 23.0067 11.4112 22.9785 11.3416C22.2318 9.51721 21.1071 7.96904 19.5991 6.70301C19.5168 6.63395 19.4345 6.56371 19.3534 6.49348C19.3428 6.48403 19.3345 6.47223 19.3234 6.45924C20.2282 5.55206 21.1336 4.64548 22.0219 3.75482C21.5739 3.30684 21.16 2.89132 20.7708 2.5C14.8875 8.40109 8.97538 14.3299 3.06913 20.2534ZM16.4837 9.26695C17.4632 11.1132 17.0587 13.5349 15.546 15.0282C14.0109 16.5433 11.6434 16.9311 9.84139 15.9513C9.89136 15.897 9.93722 15.8439 9.98602 15.7943C10.3911 15.387 10.8015 14.9845 11.1989 14.5701C11.3165 14.448 11.4311 14.4285 11.594 14.4338C11.9556 14.445 12.3318 14.4728 12.6787 14.3931C14.2584 14.0307 15.2156 12.587 14.981 10.9792C14.9704 10.9078 14.9622 10.8033 15.0016 10.762C15.486 10.2633 15.9793 9.77337 16.4837 9.26695Z"
                fill="#818389"
              />
              <path
                d="M9.01767 11.5966C10.0742 10.536 11.0954 9.51014 12.1395 8.4619C11.3317 8.42649 10.6362 8.67792 10.0406 9.205C9.33514 9.82946 9.01002 10.6233 9.01767 11.5966Z"
                fill="#818389"
              />
            </svg>
          ) : null}
        </div>
      </div>
      {isNeedValidate && (
        <p
          className={clsx(
            ' mt-2 ml-3 font-medium',
            isValidating ? 'text-red-600' : 'text-[#6B7280]'
          )}
        >
          Min 8 signs & 1 capital letter
        </p>
      )}
    </div>
  )
}
