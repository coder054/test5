import { Backdrop, CircularProgress } from '@mui/material'

type MyLoadingProps = {
  isLoading: boolean
}

export const MyLoading = ({ isLoading }: MyLoadingProps) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
