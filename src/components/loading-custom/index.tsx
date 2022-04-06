import { CircularProgress } from '@mui/material'

export const LoadingCustom = () => {
  return (
    <div className="w-full">
      <div className="w-[24px] mx-auto">
        <CircularProgress color="primary" />
      </div>
    </div>
  )
}
