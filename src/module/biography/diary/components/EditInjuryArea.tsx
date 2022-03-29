import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { EditInjury } from './EditInjury'

type EditInjuryAreaProps = {
  onClose: (value: boolean) => void
}

export const EditInjuryArea = ({ onClose }: EditInjuryAreaProps) => {
  return (
    <div className="bg-[#202128cc] overflow-y-auto relative">
      <button
        type="button"
        onClick={() => onClose(false)}
        className="fixed top-8 left-8 flex items-center space-x-4 cursor-pointer"
      >
        <ArrowBackIosNewIcon />
        <span className="font-semibold text-[18px]"> Pains</span>
      </button>
      <div className="h-screen w-[650px] py-24 mx-auto">
        <EditInjury onClose={onClose} />
      </div>
    </div>
  )
}
