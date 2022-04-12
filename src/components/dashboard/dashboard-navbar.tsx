import type { AppBarProps } from '@mui/material'
import {
  AppBar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAtom } from 'jotai'
import Link from 'next/link'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { openModalDiaryUpdateAtom } from 'src/atoms/diaryAtoms'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import DiaryUpdate from 'src/modules/update-diary'
import { safeAvatar } from 'src/utils/utils'
import { Bell as BellIcon } from '../../icons/bell'
import { Menu as MenuIcon } from '../../icons/menu'
import { Search as SearchIcon } from '../../icons/search'
import { Users as UsersIcon } from '../../icons/users'
import { UpdateDiaryIcon, XIcon } from '../icons'
import { ModalMui } from '../ModalMui'
import { AccountPopover } from './account-popover'
import { ContactsPopover } from './contacts-popover'
import { ContentSearchDialog } from './content-search-dialog'
import { LanguagePopover } from './language-popover'
import { NotificationsPopover } from './notifications-popover'

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
  const [setOpenModalAddtFriend, setOpenModalAddFriend] =
    useState<boolean>(false)

  const handleOpenModalAddFriend = (): void => {
    setOpenModalAddFriend(true)
  }

  const handleCloseModalAddFriend = (): void => {
    setOpenModalAddFriend(false)
  }

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpenModalAddFriend} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseModalAddFriend}
        open={setOpenModalAddtFriend}
      />
    </>
  )
}

const UpdateDiaryButton = () => {
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(
    openModalDiaryUpdateAtom
  )
  return (
    <>
      <button
        onClick={() => setOpenModalDiaryUpdate(true)}
        className="bg-[#4654EA] active:scale-110 duration-150 laptopM:py-2 mobileM:py-[4px] mobileM:px-[8px] laptopM:px-[22px] laptopM:rounded-[8px] mobileM:rounded-[4px] flex items-center laptopM:space-x-2 relative"
      >
        <span className="mobileM:hidden">
          <UpdateDiaryIcon />
        </span>
        <span className="text-white mobileM:text-[13px] laptopM:text-[14px] font-semibold">
          Update Diary
        </span>
      </button>
      <ModalMui
        customStyle={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={openModalDiaryUpdate}
        onClose={setOpenModalDiaryUpdate}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModalDiaryUpdate(false)}
              className="absolute z-50 right-6 top-5"
            >
              <XIcon />
            </button>
            <DiaryUpdate />
          </div>
        </SimpleBar>
      </ModalMui>
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

const AccountButton = () => {
  const { infoActiveProfile } = useAuth()
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
        <img
          src={safeAvatar(infoActiveProfile?.faceImageUrl)}
          className="w-[36px] h-[36px] rounded-full object-cover mr-[16px] "
          alt=""
        />
      </Box>
      <AccountPopover
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

  const { authenticated } = useAuth() as {
    authenticated: boolean
  }

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
              <UpdateDiaryButton />
              {/* <LanguageButton /> */}
              <ContentSearchButton />
              <ContactsButton />
              <NotificationsButton />
              <AccountButton />
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
