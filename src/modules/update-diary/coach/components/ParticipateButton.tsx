import React from 'react'
import { ChervonRightIcon } from 'src/components/icons'

interface ParticipateButtonProps {
  isOpen: (value: boolean) => void
}

function ParticipateButton({ isOpen }: ParticipateButtonProps) {
  return (
    <button
      onClick={() => isOpen(true)}
      className="text-base py-1.5 rounded-lg flex justify-between text-gray-400 active:text-white duration-150 w-full"
    >
      <p>
        <span className="text-[#09E099]  font-semibold  font-Roboto">2 </span>
        Team activities registered last 7 days. Did you participate?
      </p>
      <ChervonRightIcon className="w-[25px] h-[25px] text-gray-400" />
    </button>
  )
}

export default React.memo(ParticipateButton)
