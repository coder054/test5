import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import CreateClubModal from '../../group/components/modals/CreateClubModal'
import CreateGroupModal from '../../group/components/modals/CreateGroupModal'
import CreateTeamModal from '../../group/components/modals/CreateTeamModal'
import FloatingButton from './FloatingButton'

const BUTTON =
  'px-4 py-1.5 hover:bg-gray-400 duration-150 block w-full text-left'

const OPTIONS = [
  {
    value: 'group',
    label: 'Create New Group',
  },
  {
    value: 'club',
    label: 'Create New Club',
  },
  {
    value: 'team',
    label: 'Create a Team in a Club',
  },
]

export default function CreateNew() {
  const [current, setCurrent] = useState<string>('')
  return (
    <Fragment>
      {current === 'group' && <CreateGroupModal isClose={setCurrent} />}
      {current === 'club' && <CreateClubModal isClose={setCurrent} />}
      {current === 'team' && <CreateTeamModal isClose={setCurrent} />}
      <FloatingButton>
        <Fragment>
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCurrent(option.value)
              }}
              className={clsx(
                BUTTON,
                current === option.value && 'bg-gray-600'
              )}
            >
              {option.label}
            </button>
          ))}
        </Fragment>
      </FloatingButton>
    </Fragment>
  )
}
