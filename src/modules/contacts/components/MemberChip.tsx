import { Tooltip } from '@mui/material'
import React, { Fragment } from 'react'
import { CloseIcon, XIcon } from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { safeHttpImage } from 'src/utils/utils'

type MemberChipProps = {
  onRemove: (value: MemberType) => void
  member: MemberType
  isMini: boolean
}

export default function MemberChip({
  member,
  isMini,
  onRemove,
}: MemberChipProps) {
  return (
    <Tooltip title={member.fullName}>
      {isMini ? (
        <div className="mr-4 mb-4 relative cursor-pointer">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover object-center"
            src={
              member.faceImage
                ? safeHttpImage(member.faceImage)
                : '/favicon.png'
            }
          />
          <button
            type="button"
            onClick={() => onRemove(member)}
            className="absolute scale-125 -top-1 -right-1"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <div className="bg-[#13161A] w-[190px] py-2 px-3 mr-2 mb-2 rounded-full flex justify-between items-center cursor-pointer">
          <div className="flex items-center space-x-4">
            <img
              className="w-[30px] h-[30px] rounded-full object-cover object-center"
              src={
                member.faceImage
                  ? safeHttpImage(member.faceImage)
                  : '/favicon.png'
              }
            />

            <p className="text-[16px] font-semibold w-[90px] truncate">
              {member?.fullName}
            </p>
          </div>
          <button type="button" onClick={() => onRemove(member)}>
            <XIcon />
          </button>
        </div>
      )}
    </Tooltip>
  )
}
