import Dialog from '@mui/material/Dialog'
import * as React from 'react'
import Popover from '@mui/material/Popover'
import ButtonMui from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState, forwardRef } from 'react'
import Slide from '@mui/material/Slide'

import { Button } from 'src/components'
import { EStatusRelationShip } from 'src/constants/types/biography.types'
import { axios } from 'src/utils/axios'
import { SvgX } from 'src/imports/svgs'

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore: Unreachable code error
  return <Slide direction="up" ref={ref} {...props} />
})

export const FriendButton = ({
  friendStatus,
  userId,
}: {
  friendStatus: EStatusRelationShip
  userId: string
}) => {
  const ButtonAddAsFriend = () => {
    return (
      <Button
        onClick={async () => {
          try {
            await axios.post(
              `/friends/${userId}/request-relationship?type=friends`
            )
          } catch (error) {
            alert('error')
          }
        }}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Blue font-medium "
      >
        Add as friend
      </Button>
    )
  }

  const ButtonResponse = () => {
    return (
      <Button
        onClick={() => {}}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Blue font-medium "
      >
        Response
      </Button>
    )
  }

  const ButtonFriendRequested = () => {
    return (
      <Button
        onClick={() => {}}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Dark-3 font-medium
        border-[2px] border-Grey
        "
      >
        Friend Requested
      </Button>
    )
  }

  const ButtonFriends = () => {
    return (
      <Button
        onClick={() => {}}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Dark-3 font-medium
        border-[2px] border-white "
      >
        Friends
      </Button>
    )
  }

  if (friendStatus === EStatusRelationShip.response) {
    return <>{ButtonResponse()}</>
  }

  if (friendStatus === EStatusRelationShip.no_relationship) {
    return <>{ButtonAddAsFriend()}</>
  }
  if (friendStatus === EStatusRelationShip.requested) {
    return <>{ButtonFriendRequested()}</>
  }
  if (friendStatus === EStatusRelationShip.accepted) {
    return <>{ButtonFriends()}</>
  }

  return <div className="text-white ">test</div>
}

export const FollowButton = ({ followStatus, isFollowed, userId }) => {
  const ButtonFollowing = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
      setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    return (
      <div>
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
              width: 300,
              position: 'relative',
            },
          }}
        >
          <div
            onClick={() => {
              try {
                axios.delete(
                  `/friends/${userId}/remove-relationship?type=follows`
                )
              } catch (error) {
                alert('error')
              } finally {
                handleClose()
              }
            }}
            className="p-[20px] cursor-pointer"
          >
            <div className="flex gap-[8px] items-center w-full ">
              <SvgX className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Unfollow</span>
            </div>
          </div>
        </Popover>
        <Button
          onClick={handleClick}
          className=" relative h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-transparent border-[2px] border-white font-medium "
        >
          Following
        </Button>
      </div>
    )
  }

  const ButtonFollow = () => {
    return (
      <>
        <Button
          onClick={() => {
            try {
              axios.post(`/friends/${userId}/request-relationship?type=follows`)
            } catch (error) {
              alert('error')
            }
          }}
          className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-transparent border border-Green font-medium text-Green"
        >
          Follow
        </Button>
      </>
    )
  }
  const ButtonFollowBack = () => {
    return (
      <Button
        onClick={() => {}}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] font-SVNGilroy bg-transparent border border-Green font-medium text-Green"
      >
        Follow back
      </Button>
    )
  }

  if (isFollowed === true) {
    return <ButtonFollowing />
  }

  if (followStatus === 'no_relationship') {
    return <ButtonFollow />
  }
  if (followStatus === 'follow_back') {
    return <ButtonFollowBack />
  }

  return <div className=" ">aaa</div>
}
