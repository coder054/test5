import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface ParticipateButtonProps {
  matches?: number
  teamTrainings?: number
  currentTab?: string
  isOpen: (value: boolean) => void
}

function ParticipateButton({
  isOpen,
  matches,
  teamTrainings,
  currentTab,
}: ParticipateButtonProps) {
  return (
    <button
      onClick={() => isOpen(true)}
      className="text-base py-1.5 rounded-lg flex justify-between items-center text-gray-400 hover:text-white duration-150 w-full"
    >
      <p>
        {currentTab === 'TEAM_TRAINING' && (
          <>
            <span className="text-[#09E099]  font-semibold">
              {teamTrainings}{' '}
            </span>
            Team Trainings{' '}
          </>
        )}
        {currentTab === 'MATCH' && (
          <>
            <span className="text-[#09E099]  font-semibold">{matches} </span>
            Matches{' '}
          </>
        )}
        registered last 7 days. Did you participate in?
      </p>
      <ChevronRightIcon className="text-inherit" />
    </button>
  )
}

export default React.memo(ParticipateButton)
