import { Tooltip } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { CheckedGreenIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { safeHttpImage } from 'src/utils/utils'

type MemberCardProps = {
  onChange: (value: MemberType) => void
  selected: string[]
  member: MemberType
}

export default function MemberCard({
  member,
  onChange,
  selected,
}: MemberCardProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(member)}
      className={clsx(
        'text-left flex w-full justify-between items-center py-2 px-3 hover:bg-gray-600 duration-150',
        selected.includes(member.userId) && 'text-[#09E099]'
      )}
    >
      <div className="flex items-center space-x-4">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover object-center"
          src={
            member.faceImage ? safeHttpImage(member.faceImage) : '/favicon.png'
          }
        />
        <div className="flex flex-col space-y-1 w-[220px]">
          <p className="text-[16px] font-semibold">{member?.fullName}</p>
          <div className="flex justify-between text-[12px] font-medium">
            <p className="">#{member?.username}</p>
            <p>{member.favoriteRoles ? member.favoriteRoles[0] : ''}</p>
          </div>
          <div className="flex justify-between text-[12px] font-medium">
            <Tooltip title={member?.city}>
              <p className="truncate w-[150px]">{member?.city}</p>
            </Tooltip>
            <p>{member?.clubName}</p>
          </div>
        </div>
      </div>
      <div>{selected.includes(member.userId) && <CheckedGreenIcon />}</div>
    </button>
  )
}
