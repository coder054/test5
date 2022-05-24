import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface ParticipateButtonProps {
  isOpen: (value: boolean) => void
}

function ParticipateButton({ isOpen }: ParticipateButtonProps) {
  return (
    <button
      onClick={() => isOpen(true)}
      className="text-base py-1.5 rounded-lg flex justify-between items-center text-gray-400 hover:text-white duration-150 w-full"
    >
      <p>
        <span className="text-[#09E099]  font-semibold  font-Roboto">2 </span>
        Team activities registered last 7 days. Did you participate?
      </p>
      <ChevronRightIcon className="text-inherit" />
    </button>
  )
}

export default React.memo(ParticipateButton)
