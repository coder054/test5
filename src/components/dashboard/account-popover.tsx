import LogoutIcon from '@mui/icons-material/Logout'
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Popover,
  TextField,
  Typography,
} from '@mui/material'
import clsx from 'clsx'
import { default as Link, default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { FC, useState } from 'react'
import { ROUTES } from 'src/constants/constants'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { safeAvatar } from 'src/utils/utils'
import { Cog as CogIcon } from '../../icons/cog'

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

        <div className="py-[5px] ">
          {userRoles.map((item, index) => {
            const isActive: boolean = item.roleId === currentRoleId
            return (
              <div
                key={item.roleId}
                className={clsx(
                  ` h-[58px] w-full  flex items-center mb-[5px] px-[16px] `,
                  isActive ? ' pointer-events-none ' : ' cursor-pointer '
                )}
                onClick={() => {
                  onClose()
                  setAnchorEl2(null)
                  setCurrentRoleName(item.role)
                  router.push('/feed')
                }}
              >
                <img
                  src={safeAvatar(item.faceImageUrl)}
                  className="w-[40px] h-[40px] rounded-full object-cover mr-[16px] "
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
            className=" px-[16px] h-[40px] flex w-full items-center cursor-pointer hover:bg-lighterGray "
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

            <Link href={ROUTES.UPDATE_PROFILE}>
              <a className="text-white text-[16px] leading-[150%]  ">
                Create new role
              </a>
            </Link>
          </div>
        </div>

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
                      <a className="hover:text-white text-white">
                        Account & Settings
                      </a>
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
          {userRoles.map((item) => {
            const isActive: boolean = item.roleId === currentRoleId
            return (
              <div
                key={item.roleId}
                className={clsx(
                  ` h-[58px] w-full  flex items-center mb-[5px] `,
                  isActive ? ' pointer-events-none ' : ' cursor-pointer '
                )}
                onClick={() => {
                  onClose()
                  setAnchorEl2(null)
                  setCurrentRoleName(item.role)
                  router.push('/feed')
                }}
              >
                <img
                  src={safeAvatar(item.faceImageUrl)}
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
            <div
              onClick={() => {}}
              className="text-white text-[16px] leading-[150%] "
            >
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

const ModalCreatNewRole = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Function
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          backgroundColor: 'rgb(17, 24, 39)',
          color: 'rgb(237, 242, 247)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          boxShadow: 'rgb(0 0 0 / 24%) 0px 6px 15px',
          backgroundImage: 'none',
          width: 'calc(100vw - 32px)',
        }}
        className="p-[24px]  rounded-[8px] min-h-[400px] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[700px] [max-height:calc(100vh_-_40px)]"
      >
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => {
            //@ts-ignore: Unreachable code error
            setFirstName(e.target.value)
          }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => {
            //@ts-ignore: Unreachable code error
            setLastName(e.target.value)
          }}
        />
      </div>
    </Modal>
  )
}
