import clsx from 'clsx'
import { LoadingOutlined } from '@ant-design/icons'
import { Loading } from './loading/loading'
import { ComponentPropsWithoutRef } from 'react'
import { isMobile } from 'react-device-detect'
import { CircularProgress } from '@mui/material'

type MyButtonProps = ComponentPropsWithoutRef<'button'> & {
  label: string
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
  labelClass?: string
  loadingColor?: string
  type: 'button' | 'submit' | 'reset' | undefined
}

export const Button = ({
  label,
  className,
  isLoading,
  isDisabled,
  labelClass,
  loadingColor,
  ...rest
}: MyButtonProps) => {
  return (
    <div>
      <button
        disabled={isLoading ? true : isDisabled}
        className={clsx(
          ' hover:opacity-70 duration-200 relative',
          isMobile && 'w-full',
          className
        )}
        {...rest}
      >
        <span
          className={clsx(
            'text-15px font-semibold',
            isLoading && 'invisible',
            labelClass
          )}
        >
          {label}
        </span>
        {(isLoading || isDisabled) && (
          <div className="absolute  flex items-center justify-center opacity-75 top-0 right-0 left-0 bottom-0 cursor-not-allowed">
            {isLoading && (
              <CircularProgress
                size={25}
                sx={{
                  color: loadingColor,
                }}
              />
            )}
          </div>
        )}
      </button>
    </div>
  )
}
