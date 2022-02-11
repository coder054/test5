import clsx from 'clsx'
import { LoadingOutlined } from '@ant-design/icons'
import { Loading } from './loading/loading'
import { ComponentPropsWithoutRef } from 'react'

type MyButtonProps = ComponentPropsWithoutRef<'button'> & {
  label: string
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
  type: 'button' | 'submit' | 'reset' | undefined
}

export const MyButton = ({
  label,
  className,
  isLoading,
  isDisabled,
  ...rest
}: MyButtonProps) => {
  return (
    <div>
      <button
        disabled={isLoading ? true : isDisabled}
        className={clsx(
          'bg-[#4654EA] px-[61px] py-[11px] rounded-[8px] hover:opacity-70 duration-200 relative',
          className
        )}
        {...rest}
      >
        <p
          className={clsx(
            'text-15px font-semibold',
            isLoading ? 'text-[#4654EA]' : 'text-white'
          )}
        >
          {label}
        </p>
        {(isLoading || isDisabled) && (
          <div className="absolute bg-gray-400 flex items-center justify-center opacity-75 top-0 right-0 left-0 bottom-0 cursor-not-allowed">
            {isLoading && <Loading size={20}></Loading>}
          </div>
        )}
      </button>
    </div>
  )
}
