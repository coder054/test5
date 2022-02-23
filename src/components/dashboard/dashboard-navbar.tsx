import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import type { AppBarProps } from '@mui/material'
import { Menu as MenuIcon } from '../../icons/menu'
import { AccountPopover } from './account-popover'
import { ContactsPopover } from './contacts-popover'
import { ContentSearchDialog } from './content-search-dialog'
import { NotificationsPopover } from './notifications-popover'
import { LanguagePopover } from './language-popover'
import { Bell as BellIcon } from '../../icons/bell'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { Search as SearchIcon } from '../../icons/search'
import { Users as UsersIcon } from '../../icons/users'
import { LOCAL_STORAGE_KEY } from 'src/constants/constants'
import { useAuth } from 'src/module/authen/auth/AuthContext'

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void
}

const languages = {
  en: '/static/icons/uk_flag.svg',
  de: '/static/icons/de_flag.svg',
  es: '/static/icons/es_flag.svg',
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}))

const LanguageButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const { i18n } = useTranslation()
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const handleOpenPopover = (): void => {
    setOpenPopover(true)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(false)
  }

  return (
    <>
      <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%',
            },
          }}
        >
          <img alt="" src={languages[i18n.language]} />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  )
}

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleOpenSearchDialog = (): void => {
    setOpenDialog(true)
  }

  const handleCloseSearchDialog = (): void => {
    setOpenDialog(false)
  }

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      />
    </>
  )
}

const ContactsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const handleOpenPopover = (): void => {
    setOpenPopover(true)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(false)
  }

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton onClick={handleOpenPopover} sx={{ ml: 1 }} ref={anchorRef}>
          <UsersIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContactsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  )
}

const NotificationsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [unread, setUnread] = useState<number>(0)
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = (): void => {
    setOpenPopover(true)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(false)
  }

  const handleUpdateUnread = (value: number): void => {
    setUnread(value)
  }

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
          <Badge color="error" badgeContent={unread}>
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  )
}

const AccountButton = ({
  playerProfile,
}: {
  playerProfile: IPlayerProfile
}) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null)
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`

  const handleOpenPopover = (): void => {
    setOpenPopover(true)
  }

  const handleClosePopover = (): void => {
    setOpenPopover(false)
  }

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={playerProfile?.media?.faceImage}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        playerProfile={playerProfile}
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  )
}

// Generated by https://quicktype.io

export interface IPlayerProfile {
  userId: string
  type: string
  uid: string
  isOnline: boolean
  health: Health
  playerCareer: PlayerCareer
  playerSkills: PlayerSkills
  username: string
  timezone: string
  account: Account
  circleCompleted: number
  lastActive: number
  inviterId: string
  media: Media
  socialLinks: SocialLinks
  fcmToken: string[]
  updatedAt: number
  profile: Profile
  settings: Settings
  teamIds: string[]
  ips: string[]
}

export interface Account {
  expiredIn: number
  isVerified: boolean
  email: string
  verifyCode: string
  createdAt: number
  isActive: boolean
}

export interface Health {
  leftFootLength: number
  height: Eight
  rightFootLength: number
  weight: Eight
}

export interface Eight {
  value: number
  updatedAt: string
}

export interface Media {
  bodyImage: string
  videoLinks: VideoLink[]
  faceImage: string
  teamImage: string
}

export interface VideoLink {
  thumbnailUrl: string
  source: string
  url: string
}

export interface PlayerCareer {
  shirtNumber: number
  favoriteRoles: string[]
  seasonEndDate: string
  estMarketValue: number
  summary: string
  clubId: string
  contractedFrom: string
  teamCalendarLinks: any[]
  seasonStartDate: string
  contractedUntil: string
  contractedClub: ContractedClub
  currentTeams: CurrentTeam[]
}

export interface ContractedClub {
  clubId: string
  city: string
  websiteUrl: null
  arena: string
  clubName: string
  country: string
  logoUrl: string
}

export interface CurrentTeam {
  clubId: string
  teamId: string
  teamName: string
  teamImage: string
  status: string
}

export interface PlayerSkills {
  overall: Overall
  specialityTags: string[]
  radar: Radar
}

export interface Overall {
  tactics: number
  mental: number
  physics: number
  rightFoot: number
  technics: number
  leftFoot: number
}

export interface Radar {
  dribbling: number
  attacking: number
  pace: number
  defending: number
  tackling: number
  passing: number
  heading: number
  shooting: number
}

export interface Profile {
  firstName: string
  birthCountry: Country
  postNumber: string
  birthDay: string
  homeAddress: string
  city: string
  phone: string
  email: string
  gender: string
  lastName: string
  fullName: string[]
  region: string
}

export interface Country {
  name: string
  alpha2Code: string
  region: string
  flag: string
  alpha3Code: string
  phoneCode?: string
}

export interface Settings {
  notificationOptions: NotificationOptions
  notificationOn: boolean
  privacy: Privacy
  country: Country
  language: string
  public: boolean
}

export interface NotificationOptions {
  profileAndDiaryUpdates: boolean
  messageUpdates: boolean
  inviteUpdates: boolean
  feedUpdates: boolean
}

export interface Privacy {
  label: string
  status: boolean
}

export interface SocialLinks {
  tiktok: string
  veoHighlites: string
  instagram: string
  twitter: string
  facebook: string
  youtube: string
}

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props

  const [playerProfile, setPlayerProfile] = useState<IPlayerProfile>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.playerProfile))
  )

  const { authenticated } = useAuth()

  useEffect(() => {
    console.log('aaa playerProfile: ', playerProfile)
  }, [playerProfile])

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: 'calc(100% - 280px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {!authenticated ? (
            <div className=" animate-appear  ">
              <Link href="/signin">
                <a>
                  <button className="w-[224px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Blue mr-[26px]">
                    Sign In
                  </button>
                </a>
              </Link>

              <Link href="/signup">
                <a>
                  <button className="w-[224px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-transparent text-Green border border-Green ">
                    Sign Up
                  </button>
                </a>
              </Link>
            </div>
          ) : (
            <>
              <LanguageButton />
              <ContentSearchButton />
              <ContactsButton />
              <NotificationsButton />
              <AccountButton playerProfile={playerProfile} />
            </>
          )}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  )
}

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
}
