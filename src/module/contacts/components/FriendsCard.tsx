import clsx from 'clsx'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { ChervonRightIcon } from 'src/components/icons'
import { FriendsType } from 'src/constants/types/contacts.types'
import { imgAvatar } from 'src/imports/images'

type FriendsCardProps = {
  user?: FriendsType
}

export const FriendsCard = ({ user }: FriendsCardProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  return (
    <div className="flex w-full my-5 h-[80px]">
      <div
        className={clsx(
          'w-full bg-[#202128cc] rounded-lg flex items-center px-4',
          !isMobile && 'grid grid-cols-4'
        )}
      >
        <div className="flex">
          <img
            className="w-[50px] h-[50px] rounded-lg"
            src={user?.faceImage ? user?.faceImage : imgAvatar}
            alt="Profile Image"
          />
          <span className="ml-3 space-y-[2px]">
            <p className=" font-semibold text-[18px]">
              {user.firstName + ' ' + user.lastName}
            </p>
            <p className=" text-[#A2A5AD] font-normal text-[14px]">
              #{user.username}
            </p>
          </span>
        </div>
        {!isMobile && (
          <div className="text-white text-clip overflow-hidden col-span-2 grid grid-cols-3">
            <span className="text-left self-center">
              {user.favoriteRoles.map((role) => role).join(', ')}
            </span>
            <span className="text-left self-center">
              {user.clubName ? user.clubName : ''}
            </span>
            <span className="text-left self-center">
              {user.city ? user.city : ''}
            </span>
          </div>
        )}
        {!isMobile && (
          <div className="flex justify-end">
            <span
              onClick={() => setIsActive(!isActive)}
              className={clsx(
                'cursor-pointer duration-200 p-[4px] rounded-full hover:bg-gray-500',
                isActive && 'rotate-180'
              )}
            >
              <ChervonRightIcon />
            </span>
          </div>
        )}
      </div>
      <div
        className={clsx(
          'duration-200 bg-[#13161A] items-center grid grid-cols-2  rounded-tr-lg rounded-br-lg test overflow-x-hidden',
          isActive && 'test-after divide-x-[1px]'
        )}
      >
        <span className="text-center cursor-pointer text-clip overflow-hidden">
          Block
        </span>
        <span className="text-center cursor-pointer text-clip overflow-hidden">
          Delete
        </span>
      </div>
    </div>
  )
}
