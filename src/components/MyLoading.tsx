import { Backdrop, CircularProgress } from '@mui/material'

type LoadingProps = {
  isLoading: boolean
  children: React.ReactElement
}

export const Loading = ({ isLoading, children }: LoadingProps) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
      </Backdrop>

      <>{children}</>
    </>
  )
}
