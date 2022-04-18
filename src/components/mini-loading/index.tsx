import { CircularProgress } from '@mui/material'

type MiniLoadingProps = {
  size: number
  color: string
}

export const MiniLoading = ({ size, color }: MiniLoadingProps) => {
  return (
    <span className="flex items-center">
      <CircularProgress sx={{ color: color }} size={size} />
    </span>
  )
}
