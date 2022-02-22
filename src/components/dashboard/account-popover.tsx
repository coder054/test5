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
import Link from 'next/link'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { Cog as CogIcon } from '../../icons/cog'
import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from '../../icons/switch-horizontal-outlined'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { IPlayerProfile } from './dashboard-navbar'

interface AccountPopoverProps {
  anchorEl: null | Element
  onClose?: () => void
  open?: boolean
  playerProfile: IPlayerProfile
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, playerProfile, ...other } = props
  const { signout } = useAuth()

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      keepMounted
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 300 } }}
      transitionDuration={0}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          p: 2,
          display: 'flex',
        }}
      >
        <Avatar
          src={playerProfile?.media?.faceImage}
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
          <Typography variant="body1">{`${playerProfile?.profile?.firstName} ${playerProfile?.profile?.lastName}`}</Typography>
          <Typography color="textSecondary" variant="body2">
            Company Inc
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ my: 1 }}>
        {/* <NextLink href="/dashboard/social/profile" passHref> */}
        <MenuItem component="a">
          <ListItemIcon>
            <UserCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1">Profile</Typography>}
          />
        </MenuItem>
        {/* </NextLink> */}
        {/* <NextLink href="/dashboard/account" passHref> */}
        <MenuItem component="a">
          <ListItemIcon>
            <CogIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1">
                <Link href="/dashboard/account">
                  <a className="">Settings</a>
                </Link>
              </Typography>
            }
          />
        </MenuItem>
        {/* </NextLink> */}
        <NextLink href="/dashboard" passHref>
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
        </NextLink>
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
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
