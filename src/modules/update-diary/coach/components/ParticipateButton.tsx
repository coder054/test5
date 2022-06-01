import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import clsx from 'clsx'

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
    <>
      {currentTab === 'TEAM_TRAINING' && (
        <button
          onClick={() => isOpen(true)}
          className={clsx(
            'text-base py-1.5 rounded-lg flex justify-between items-center text-gray-400 hover:text-white duration-150 w-full',
            teamTrainings === 0 ? 'hidden' : 'block'
          )}
        >
          <span className="font-medium">
            <span className="text-[#09E099]"> {teamTrainings}</span> Team
            Trainings registered last 7 days. Did you participate in?
          </span>
          <ChevronRightIcon className="text-inherit" />
        </button>
      )}
      {currentTab === 'MATCH' && (
        <button
          onClick={() => isOpen(true)}
          className={clsx(
            'text-base py-1.5 rounded-lg flex justify-between items-center text-gray-400 hover:text-white duration-150 w-full',
            matches === 0 ? 'hidden' : 'block'
          )}
        >
          <span className="font-medium">
            <span className="text-[#09E099]"> {matches}</span> Team Matches
            registered last 7 days. Did you participate in?
          </span>
          <ChevronRightIcon className="text-inherit" />
        </button>
      )}
    </>
  )
}

export default React.memo(ParticipateButton)
