import clsx from 'clsx'
import { useState } from 'react'
import { FriendsType } from 'src/constants/types/contacts.types'
import { imgAvatar } from 'src/imports/images'
import { MyImage } from './MyImage'
import { Text } from './Text'
import { isMobile } from 'react-device-detect'
import { ChatIcon, ChervonRightIcon, PhoneCallIcon } from './icons'
import { CardMedia } from '@mui/material'

type ContactCardProps = {
  user?: FriendsType
}

export const ContactCard = ({ user }: ContactCardProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  console.log('DATA: ', user)

  return (
    <div className="flex min-h-[82px] my-5">
      <div
        className={clsx(
          'bg-[#202128cc] w-full p-4 flex items-center rounded-tl-lg rounded-bl-lg',
          !isActive && 'rounded-lg'
        )}
      >
        <img
          className="w-[50px] h-[50px] mr-2 mobileM:mr-4 rounded-lg"
          src={user?.faceImage ? user?.faceImage : imgAvatar}
        />
        <div className="w-[260px]">
          <Text className={'text-white'} name={'Header6'}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <Text name="Body2" className="text-Grey">
            {'#' + user?.username}
          </Text>
        </div>
        {!isMobile && (
          <>
            <Text
              name="body1"
              className="text-white w-[250px] text-clip overflow-hidden"
            >
              {user.favoriteRoles.map((role) => role).join(', ')}
            </Text>
            <Text name="body1" className="text-white mr-[80px] ">
              {user.clubName ? user.clubName : ''}
            </Text>
            <Text
              name="body1"
              className="text-white mr-[80px] text-clip overflow-hidden"
            >
              {user.city ? user.city : ''}
            </Text>
            <div className="flex-grow "></div>
            <div className="flex items-center space-x-[20px] mr-[20px] ">
              {/* <PhoneCallIcon />
              <ChatIcon /> */}
              <span
                onClick={() => setIsActive(!isActive)}
                className={clsx(
                  'cursor-pointer duration-150 ',
                  isActive && 'rotate-180'
                )}
              >
                <ChervonRightIcon />
              </span>
            </div>
          </>
        )}
      </div>

      {!isMobile && (
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
      )}
    </div>
  )
}
