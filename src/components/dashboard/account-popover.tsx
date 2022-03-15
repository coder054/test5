import { useRouter } from 'next/router'
import LogoutIcon from '@mui/icons-material/Logout'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import { FC, useState } from 'react'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { Cog as CogIcon } from '../../icons/cog'
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../icons/switch-horizontal-outlined'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { IPlayerProfile } from './dashboard-navbar'

interface AccountPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  open?: boolean
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props
  const router = useRouter()
  const [anchorEl2, setAnchorEl2] = useState(null)
  const {
    signout,
    userRoles,
    currentRoleId,
    setCurrentRoleName,
    infoActiveProfile,
  } = useAuth()

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        keepMounted
        onClose={onClose}
        open={open}
        PaperProps={{
          sx: {
            width: 300,
            position: 'relative',
          },
        }}
        transitionDuration={0}
        {...other}
      >
        <div
          id="test5"
          className="border w-[0px] h-[0px] relative top-0 left-0 z-50 bg-red-400 transform translate-x-[-300px] "
        ></div>
        <Box
          onClick={(event) => {
            setAnchorEl2(document.getElementById('test5'))
          }}
          sx={{
            alignItems: 'center',
            p: 2,
            display: 'flex',
            cursor: 'pointer',
          }}
        >
          <Avatar
            src={infoActiveProfile?.faceImageUrl}
            sx={{
              height: 40,
              width: 40,
            }}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          <Box
            sx={{
              ml: 1,
            }}
          >
            <Typography variant="body1">{`${infoActiveProfile?.firstName} ${infoActiveProfile?.lastName}`}</Typography>
            <Typography color="textSecondary" variant="body2">
              Company Inc
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ my: 1 }}>
          {/* <NextLink href="/dashboard/social/profile" passHref> */}
          {/* <MenuItem component="a">
          <ListItemIcon>
            <UserCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Profile</Typography>}
          />
        </MenuItem> */}
          {/* </NextLink> */}
          <NextLink href="/account-and-settings" passHref>
            <MenuItem component="a">
              <ListItemIcon>
                <CogIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <Link href="/account-and-settings">
                      <a className="">Account & Settings</a>
                    </Link>
                  </Typography>
                }
              />
            </MenuItem>
          </NextLink>
          {/* <NextLink href="/dashboard" passHref>
          <MenuItem component="a">
            <ListItemIcon>
              <SwitchHorizontalOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">Change organization</Typography>
              }
            />
          </MenuItem>
        </NextLink> */}
          <Divider />
          <MenuItem onClick={signout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Logout</Typography>}
            />
          </MenuItem>
        </Box>
      </Popover>

      <Popover
        PaperProps={{
          sx: {
            width: 300,
          },
        }}
        open={Boolean(anchorEl2)}
        anchorEl={anchorEl2}
        onClose={() => {
          setAnchorEl2(null)
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className=" px-[20px] py-[5px] ">
          {userRoles.map((item, index) => {
            const isActive: boolean = item.roleId === currentRoleId
            return (
              <div
                key={item.roleId}
                className={clsx(
                  ` h-[58px] w-full  flex items-center mb-[5px] `,
                  isActive ? ' pointer-events-none ' : ' cursor-pointer '
                )}
                onClick={() => {
                  setCurrentRoleName(item.role)
                  router.push('/dashboard/news')
                }}
              >
                <img
                  src={item.faceImageUrl}
                  className="w-[32px] h-[32px] rounded-full object-cover mr-[16px] "
                  alt=""
                />
                <div className=" ">
                  <div
                    className={`${
                      isActive ? 'text-Green' : 'text-white'
                    } text-[16px] leading-[150%]`}
                  >
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="flex ">
                    <span
                      className={`${
                        isActive ? 'text-Green' : 'text-Grey'
                      } text-[12px] leading-[150%] `}
                    >
                      #{item.username}
                    </span>
                    <div className="w-[8px] inline-block "></div>
                    <span
                      className={`${
                        isActive ? 'text-Green' : 'text-Grey'
                      } text-[12px] leading-[150%] `}
                    >
                      {item.role === 'COACH' ? 'Coach' : item.position}
                    </span>
                  </div>
                </div>
                <div className="grow "></div>

                {isActive && (
                  <svg
                    className="cursor-pointer"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.9399L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
                      fill="#09E099"
                    />
                  </svg>
                )}
              </div>
            )
          })}

          <div
            onClick={() => {
              // todo
            }}
            className="h-[32px] flex w-full items-center cursor-pointer "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                fill="white"
              />
            </svg>
            <div className="w-[8px] "></div>
            <div className="text-white text-[16px] leading-[150%] ">
              Create new role
            </div>
          </div>
        </div>
      </Popover>
    </>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
