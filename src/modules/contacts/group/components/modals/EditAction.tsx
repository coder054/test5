import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import FloatingButton from '../../../components/modals/FloatingButton'
import CreateGroupModal from './CreateGroupModal'

const BUTTON =
  'px-4 py-1.5 hover:bg-gray-400 duration-150 block w-full text-left'

const OPTIONS = [
  {
    value: 'group',
    label: 'Edit group',
  },
  {
    value: 'member',
    label: 'Create New Club',
  },
  {
    value: 'admin',
    label: 'Create a Team in a Club',
  },
  {
    value: 'owner',
    label: 'Create a Team in a Club',
  },
]

export default function EditAction() {
  const [current, setCurrent] = useState<string>('')
  return (
    <Fragment>
      {current === 'group' && <CreateGroupModal isClose={setCurrent} />}
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
              className={clsx(BUTTON)}
            >
              {option.label}
            </button>
          ))}
        </Fragment>
      </FloatingButton>
    </Fragment>
  )
}
