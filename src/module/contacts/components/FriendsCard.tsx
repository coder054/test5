import clsx from 'clsx'
import { Button } from 'src/components/Button'
import { MyButton } from 'src/components/MyButton'
import Link from 'next/link'

import Popover from '@mui/material/Popover'

import { useState } from 'react'
import { ChervonRightIcon } from 'src/components/icons'
import { FriendsType } from 'src/constants/types/contacts.types'
import { imgAvatar } from 'src/imports/images'
import { getErrorMessage, getStr } from 'src/utils/utils'
import { ModalMui } from 'src/components/ModalMui'
import { notiToast } from 'src/components/common/Toast'
import { axios } from 'src/utils/axios'

type FriendsCardProps = {
  user?: FriendsType
}

export const FriendsCard = ({ user }: FriendsCardProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalBlock, setIsOpenModalBlock] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlocking, setIsBlocking] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleDeleteFriend = async (userId) => {
    try {
      setIsDeleting(true)
      await axios.delete(`/friends/${userId}/remove-relationship?type=friends`)
      notiToast({
        type: 'success',
        message: 'Remove relationship successfully',
      })
      setIsOpenModalDelete(false)
    } catch (error) {
      notiToast({
        message: getErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsDeleting(false)
    }
  }
  const handleBlockFriend = async (userId) => {
    try {
      setIsBlocking(true)
      await axios.post(`/friends/${userId}/block-friend`, {
        userId,
      })
      notiToast({
        type: 'success',
        message: 'Block successfully',
      })
      setIsOpenModalBlock(false)
    } catch (error) {
      notiToast({
        message: getErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsBlocking(false)
    }
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: 158,
            position: 'relative',
          },
        }}
      >
        <div className="py-[5px]">
          <div
            onClick={() => {
              try {
                setIsOpenModalDelete(true)
              } catch (error) {
                // alert('error')
              } finally {
                handleClose()
              }
            }}
            className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919] mb-[5px] "
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.99992 12.6667C3.99992 13.4 4.59992 14 5.33325 14H10.6666C11.3999 14 11.9999 13.4 11.9999 12.6667V4.66667H3.99992V12.6667ZM12.6666 2.66667H10.3333L9.66659 2H6.33325L5.66659 2.66667H3.33325V4H12.6666V2.66667Z"
                fill="#D60C0C"
              />
            </svg>

            <span className="text-white ">Delete Friend</span>
          </div>
          <div
            onClick={() => {
              try {
                setIsOpenModalBlock(true)
              } catch (error) {
              } finally {
                handleClose()
              }
            }}
            className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99992 1.33301C4.32392 1.33301 1.33325 4.32367 1.33325 7.99967C1.33325 11.6757 4.32392 14.6663 7.99992 14.6663C11.6759 14.6663 14.6666 11.6757 14.6666 7.99967C14.6666 4.32367 11.6759 1.33301 7.99992 1.33301ZM2.66659 7.99967C2.66659 6.76901 3.08925 5.63834 3.79192 4.73501L11.2646 12.2077C10.3619 12.9103 9.23059 13.333 7.99992 13.333C5.05925 13.333 2.66659 10.9403 2.66659 7.99967ZM12.2079 11.2643L4.73525 3.79167C5.63859 3.08901 6.76925 2.66634 7.99992 2.66634C10.9406 2.66634 13.3333 5.05901 13.3333 7.99967C13.3333 9.23034 12.9099 10.361 12.2079 11.2643Z"
                fill="#D60C0C"
              />
            </svg>

            <span className="text-white ">Block</span>
          </div>
        </div>
      </Popover>

      <ModalMui isOpen={isOpenModalDelete} onClose={setIsOpenModalDelete}>
        <div className="flex flex-col items-center">
          <svg
            className="mb-[25px] "
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 47.5C15 50.25 17.25 52.5 20 52.5H40C42.75 52.5 45 50.25 45 47.5V17.5H15V47.5ZM47.5 10H38.75L36.25 7.5H23.75L21.25 10H12.5V15H47.5V10Z"
              fill="#D60C0C"
            />
          </svg>

          <p className="text-[24px] leading-[137%] font-medium mb-[27px]">
            Delete friend
          </p>
          <p className="text-[14px] leading-[157%] mb-[28px]">
            Are you sure you want to delete this user?
          </p>

          <div className="flex justify-between mt-[20px] space-x-8">
            <MyButton
              type="button"
              label="Cancel"
              onClick={() => setIsOpenModalDelete(false)}
            />
            <Button
              type="button"
              loadingColor="#09E099"
              className=" px-[61px]  py-[9px] rounded-[8px] bg-Red "
              labelClass="text-white"
              onClick={handleDeleteFriend.bind(null, user.userId)}
              label="Delete"
              isLoading={isDeleting}
            />
          </div>
        </div>
      </ModalMui>
      <ModalMui isOpen={isOpenModalBlock} onClose={setIsOpenModalBlock}>
        <div className="flex flex-col items-center">
          <svg
            className="mb-[25px] "
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 47.5C15 50.25 17.25 52.5 20 52.5H40C42.75 52.5 45 50.25 45 47.5V17.5H15V47.5ZM47.5 10H38.75L36.25 7.5H23.75L21.25 10H12.5V15H47.5V10Z"
              fill="#D60C0C"
            />
          </svg>

          <p className="text-[24px] leading-[137%] font-medium mb-[27px]">
            Block
          </p>
          <p className="text-[14px] leading-[157%] mb-[28px]">
            Are you sure you want to block this user?
          </p>

          <div className="flex justify-between mt-[20px] space-x-8">
            <MyButton
              type="button"
              label="Cancel"
              onClick={() => setIsOpenModalBlock(false)}
            />
            <Button
              type="button"
              loadingColor="#09E099"
              className=" px-[61px]  py-[9px] rounded-[8px] bg-Red "
              labelClass="text-white"
              onClick={handleBlockFriend.bind(null, user.userId)}
              label="Block"
              isLoading={isBlocking}
            />
          </div>
        </div>
      </ModalMui>

      <div className="flex xl:hidden border w-full my-5 h-[80px] "></div>
      <div className=" hidden xl:flex w-full my-5 h-[80px]">
        <div
          className={clsx(
            'w-full bg-[#202128cc] rounded-lg items-center px-4 grid grid-cols-4'
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
          <div className="text-white text-clip overflow-hidden col-span-2 grid grid-cols-3">
            <span className="text-left self-center">
              {user.favoriteRoles.map((role) => role).join(', ')}
            </span>
            <span className="text-left self-center">
              {`${getStr(user, 'clubName')}`}
              {!!getStr(user, 'currentTeams[0]') &&
                ` / ${getStr(user, 'currentTeams[0]')}`}
            </span>
            <span className="text-left self-center">
              {user.city ? user.city : ''}
            </span>
          </div>
          <div className="flex justify-end gap-x-[20px]">
            <svg
              onClick={() => {
                alert('coming soon')
              }}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                fill="white"
              />
            </svg>
            <Link
              href={`/${user.type === 'COACH' ? 'coach' : 'player'}/${
                user.username
              }/${user.firstName}.${user.lastName}`}
            >
              <a target={'_blank'}>
                <svg
                  className="cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.59009 16.59L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.59Z"
                    fill="white"
                  />
                </svg>
              </a>
            </Link>

            <svg
              onClick={handleClick}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                fill="#6B7280"
              />
            </svg>
          </div>
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
    </>
  )
}
