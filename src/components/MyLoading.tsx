import { Backdrop, CircularProgress } from '@mui/material'
import clsx from 'clsx'
import { ComponentPropsWithRef } from 'react'

type LoadingProps = ComponentPropsWithRef<'div'> & {
  isLoading: boolean
  children: React.ReactElement
  className?: string
}

export const Loading = ({
  isLoading,
  children,
  className,
  ...rest
}: LoadingProps) => {
  return (
    <div className={clsx('relative', className)} {...rest}>
      <Backdrop
        sx={{
          backgroundColor: 'unset',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute',
        }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <div className={clsx(isLoading && 'opacity-50')}>{children}</div>
    </div>
  )
}
