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
import { SvgCheck, SvgX } from 'src/imports/svgs'

const Transition = forwardRef(function Transition(props, ref) {
  //@ts-ignore: Unreachable code error
  return <Slide direction="up" ref={ref} {...props} />
})

export const FriendButton = ({
  friendStatus,
  userId,
  setFakeRelation,
}: {
  friendStatus: EStatusRelationShip
  userId: string
  setFakeRelation: any
}) => {
  const ButtonAddAsFriend = () => {
    return (
      <Button
        onClick={async () => {
          try {
            await axios.post(
              `/friends/${userId}/request-relationship?type=friends`
            )

            setFakeRelation((prevState) => {
              return {
                ...prevState,
                friendStatus: 'requested',
              }
            })
          } catch (error) {
            alert('error')
          }
        }}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-Blue font-bold "
      >
        Add as friend
      </Button>
    )
  }

  const ButtonResponse = () => {
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
              width: 220,
              position: 'relative',
            },
          }}
        >
          <div className="py-[5px] cursor-pointer">
            <div
              onClick={() => {
                try {
                  axios.patch(
                    `/friends/response-relationship?status=accepted&type=friends&userId=${userId}`
                  )

                  setFakeRelation((prevState) => {
                    return {
                      ...prevState,
                      friendStatus: 'accepted',
                    }
                  })
                } catch (error) {
                  alert('error')
                } finally {
                  handleClose()
                }
              }}
              className="flex gap-[8px] items-center w-full px-[12px] py-[3px] mb-[5px] cursor-pointer hover:bg-[#81838919] "
            >
              <SvgCheck className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Confirm</span>
            </div>
            <div
              onClick={() => {
                try {
                  axios.delete(
                    `/friends/${userId}/remove-relationship?type=friends`
                  )

                  setFakeRelation((prevState) => {
                    return {
                      ...prevState,
                      friendStatus: 'no_relationship',
                    }
                  })
                } catch (error) {
                  alert('error')
                } finally {
                  handleClose()
                }
              }}
              className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919]"
            >
              <SvgX className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Delete Request</span>
            </div>
          </div>
        </Popover>

        <Button
          onClick={handleClick}
          className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-Blue font-bold "
        >
          Response
        </Button>
      </>
    )
  }

  const ButtonFriendRequested = () => {
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
              width: 220,
              position: 'relative',
            },
          }}
        >
          <div
            onClick={() => {
              try {
                axios.delete(
                  `/friends/${userId}/remove-relationship?type=friends`
                )

                setFakeRelation((prevState) => {
                  return {
                    ...prevState,
                    friendStatus: 'no_relationship',
                  }
                })
              } catch (error) {
                alert('error')
              } finally {
                handleClose()
              }
            }}
            className="py-[5px] cursor-pointer"
          >
            <div className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919]">
              <SvgX className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Cancel Request</span>
            </div>
          </div>
        </Popover>
        <Button
          onClick={handleClick}
          className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-Dark-3 font-bold
        border-[2px] border-Grey
        "
        >
          Friend Requested
        </Button>
      </>
    )
  }

  const ButtonFriends = () => {
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
              width: 220,
              position: 'relative',
            },
          }}
        >
          <div
            onClick={() => {
              try {
                axios.delete(
                  `/friends/${userId}/remove-relationship?type=friends`
                )

                setFakeRelation((prevState) => {
                  return {
                    ...prevState,
                    friendStatus: 'no_relationship',
                  }
                })
              } catch (error) {
                alert('error')
              } finally {
                handleClose()
              }
            }}
            className="py-[5px] cursor-pointer"
          >
            <div className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919]">
              <SvgX className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Unfriend</span>
            </div>
          </div>
        </Popover>
        <Button
          onClick={handleClick}
          className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-Dark-3 font-bold
        border-[2px] border-white "
        >
          Friends
        </Button>
      </>
    )
  }

  if (friendStatus === 'response') {
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

export const FollowButton = ({
  followStatus,
  isFollowed,
  userId,
  setFakeRelation,
  relations,
}) => {
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
              width: 220,
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

                setFakeRelation((prevState) => {
                  let newFanCount = 0
                  newFanCount = relations.fanCount - 1
                  if (newFanCount === -1) {
                    newFanCount = 0
                  }
                  return {
                    ...prevState,
                    isFollowed: false,
                    followStatus: 'follow_back',
                    fanCount: newFanCount,
                  }
                })
              } catch (error) {
                alert('error')
              } finally {
                handleClose()
              }
            }}
            className="py-[5px] cursor-pointer"
          >
            <div className="flex gap-[8px] items-center w-full px-[12px] py-[3px] cursor-pointer hover:bg-[#81838919] ">
              <SvgX className="fill-white w-[20px] h-[20px] inline-block " />
              <span className="text-white ">Unfollow</span>
            </div>
          </div>
        </Popover>
        <Button
          onClick={handleClick}
          className=" relative h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-transparent border-[2px] border-white font-bold "
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
              setFakeRelation((prevState) => {
                return {
                  ...prevState,
                  isFollowed: true,
                  followStatus: 'accepted',
                  fanCount: relations.fanCount + 1,
                }
              })
            } catch (error) {
              alert('error')
            }
          }}
          className="h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-Inter bg-transparent border-[2px] border-Green font-bold text-Green"
        >
          Follow
        </Button>
      </>
    )
  }
  const ButtonFollowBack = () => {
    return (
      <Button
        onClick={() => {
          try {
            axios.post(`/friends/${userId}/request-relationship?type=follows`)
            setFakeRelation((prevState) => {
              return {
                ...prevState,
                isFollowed: true,
                followStatus: 'accepted',
                fanCount: relations.fanCount + 1,
              }
            })
          } catch (error) {
            alert('error')
          }
        }}
        className="h-[50px] rounded-[8px] text-[16px] leading-[28px] font-Inter bg-transparent border border-Green font-bold text-Green"
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
