import type { AppBarProps } from '@mui/material'
import {
  AppBar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import 'simplebar/dist/simplebar.min.css'
import {
  diaryAtom,
  openModalDiaryUpdateAtom,
  dateAtom,
} from 'src/atoms/diaryAtoms'

import {
  dataModalResponseAskJoinGroupAtom,
  dataModalResponseAskJoinTeamAtom,
  dataModalResponseDeleteFromTeamAtom,
  dataModalResponseGroupAtom,
  dataModalResponseNotWantToBeDeletedFromTeamAtom,
  dataModalResponseTeamAtom,
  dataModalResponseTeamTrainingAtom,
  dataModalResponseMatchAtom,
  dataModalResponseCoachReviewAtom,
} from 'src/atoms/notiAtoms'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import DiaryUpdate from 'src/modules/update-diary'
import { axios } from 'src/utils/axios'
import { getErrorMessage, safeAvatar } from 'src/utils/utils'
import { wait } from 'src/utils/wait'
import { Bell as BellIcon } from '../../icons/bell'
import { Menu as MenuIcon } from '../../icons/menu'
import { Search as SearchIcon } from '../../icons/search'
import { Users as UsersIcon } from '../../icons/users'
import { notiToast } from '../common/Toast'
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
    <div>
      <button
        onClick={() => setOpenModalDiaryUpdate(true)}
        className="bg-[#4654EA] active:opacity-75 duration-150 laptopM:py-2 mobileM:py-[4px] mobileM:px-[8px] laptopM:px-[22px] laptopM:rounded-[8px] mobileM:rounded-[4px] flex items-center laptopM:space-x-2 relative"
      >
        <span className="mobileM:hidden tabletM:block">
          <UpdateDiaryIcon />
        </span>
        <span className="text-white mobileM:text-[13px] laptopM:text-[14px] font-semibold">
          Update Diary
        </span>
      </button>
      <ModalMui
        sx={{
          p: { xl: 0, xs: 0 },
          top: '50%',
          width: isMobile ? '100%' : 800,
          height: isMobile ? '100%' : 'auto',
          overflow: 'auto',
        }}
        isOpen={openModalDiaryUpdate}
        onClose={setOpenModalDiaryUpdate}
      >
        <div className="relative tabletM:h-[850px] mobileM:h-screen overflow-y-auto mobileM:py-2 mobileM:pb-24 tabletM:pb-0 tabletM:py-0">
          <button
            type="button"
            onClick={() => setOpenModalDiaryUpdate(false)}
            className="absolute z-50 right-6 top-5"
          >
            <XIcon />
          </button>
          <DiaryUpdate onClose={setOpenModalDiaryUpdate} />
        </div>
      </ModalMui>
    </div>
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
      <ModalResponseGroup />
      <ModalResponseTeam />
      <ModalResponseDeleteFromTeam />
      <ModalResponseNotWantToBeDeletedFromTeam />
      <ModalResponseAskJoinGroup />
      <ModalResponseAskJoinTeam />
      <ModalResponseTeamTraining />
      <ModalResponseMatch />
      <ModalResponseCoachReview />
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
            <div className=" animate-appear flex ">
              <Link href="/sign-in">
                <a>
                  <button
                    className="
                    w-[140px] xl:w-[224px]
                    h-[40px] xl:h-[45px]
                    text-[14px] xl:text-[16px]
                    mr-[8px] xl:mr-[26px]
                    rounded-[8px]  text-white font-Inter bg-Blue flex justify-center items-center font-medium
                  "
                  >
                    Sign In
                  </button>
                </a>
              </Link>

              <Link href="/signup">
                <a>
                  <button
                    className="
                  w-[140px] xl:w-[224px]
                  h-[40px] xl:h-[45px]
                  text-[14px] xl:text-[16px]
                  rounded-[8px]
                  text-white font-Inter bg-transparent text-Green border border-Green flex justify-center items-center font-medium "
                  >
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

export const ModalResponseGroup = (props) => {
  const [dataModalResponseGroup, setDataModalResponseGroup] = useAtom(
    dataModalResponseGroupAtom
  )
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseGroup({})
      }}
      open={!isEmpty(dataModalResponseGroup)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseGroup({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseGroup.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseGroup.title}
          </div>

          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseGroup.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={async () => {
            try {
              const { data } = await axios.delete(
                //@ts-ignore: Unreachable code error
                `/groups/${dataModalResponseGroup.idGroup}/leave-group`
              )
              notiToast({
                message: 'Leave group',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'You are not already in the group.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            }

            setDataModalResponseGroup({})
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            setDataModalResponseGroup({})
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseTeam = (props) => {
  const [dataModalResponseTeam, setDataModalResponseTeam] = useAtom(
    dataModalResponseTeamAtom
  )
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseTeam({})
      }}
      open={!isEmpty(dataModalResponseTeam)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseTeam({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseTeam.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseTeam.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseTeam.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={async () => {
            try {
              const { data } = await axios.delete(
                //@ts-ignore: Unreachable code error
                `/teams/${dataModalResponseTeam.idTeam}/leave-team`
              )
              notiToast({
                message: 'Leave team',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'You are not already in the team.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            }

            setDataModalResponseTeam({})
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            setDataModalResponseTeam({})
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseDeleteFromTeam = (props) => {
  const [dataModalResponseDeleteFromTeam, setDataModalResponseDeleteFromTeam] =
    useAtom(dataModalResponseDeleteFromTeamAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseDeleteFromTeam({})
      }}
      open={!isEmpty(dataModalResponseDeleteFromTeam)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseDeleteFromTeam({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseDeleteFromTeam.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseDeleteFromTeam.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseDeleteFromTeam.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={() => {
            setDataModalResponseDeleteFromTeam({})
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            try {
              const {
                teamId,
                memberId,
                memberConfirm,
                oldMemberType,
                confirmType,
              } = dataModalResponseDeleteFromTeam as any

              const params = {
                teamId,
                memberId,
                memberConfirm,
                oldMemberType,
                confirmType,
              }

              const { data } = await axios.post(
                `/teams/confirm-block-or-delete-in-a-team?${queryString.stringify(
                  params
                )}`
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'You are not already in the team.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            }
            setDataModalResponseDeleteFromTeam({})
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}
export const ModalResponseNotWantToBeDeletedFromTeam = (props) => {
  const [
    dataModalResponseNotWantToBeDeletedFromTeam,
    setDataModalResponseNotWantToBeDeletedFromTeam,
  ] = useAtom(dataModalResponseNotWantToBeDeletedFromTeamAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseNotWantToBeDeletedFromTeam({})
      }}
      open={!isEmpty(dataModalResponseNotWantToBeDeletedFromTeam)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseNotWantToBeDeletedFromTeam({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseNotWantToBeDeletedFromTeam.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseNotWantToBeDeletedFromTeam.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseNotWantToBeDeletedFromTeam.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={() => {
            setDataModalResponseNotWantToBeDeletedFromTeam({})
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            try {
              const {
                teamId,
                memberId,
                memberConfirm,
                oldMemberType,
                confirmType,
              } = dataModalResponseNotWantToBeDeletedFromTeam as any

              const params = {
                teamId,
                memberId,
                memberConfirm,
                oldMemberType,
                confirmType,
              }

              const { data } = await axios.post(
                `/teams/confirm-block-or-delete-in-a-team?${queryString.stringify(
                  params
                )}`
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'You are not already in the team.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            }
            setDataModalResponseNotWantToBeDeletedFromTeam({})
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseAskJoinGroup = (props) => {
  const [dataModalResponseAskJoinGroup, setDataModalResponseAskJoinGroup] =
    useAtom(dataModalResponseAskJoinGroupAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseAskJoinGroup({})
      }}
      open={!isEmpty(dataModalResponseAskJoinGroup)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseAskJoinGroup({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseAskJoinGroup.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseAskJoinGroup.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseAskJoinGroup.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={async () => {
            try {
              const params = {
                //@ts-ignore: Unreachable code error
                groupId: dataModalResponseAskJoinGroup.groupId,
                status: 'REJECTED',
              }

              const { data } = await axios.patch(
                `/groups?${queryString.stringify(params)}`,
                {
                  //@ts-ignore: Unreachable code error
                  memberIds: [dataModalResponseAskJoinGroup.senderId],
                }
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'Already in the group.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            } finally {
              setDataModalResponseAskJoinGroup({})
            }
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            try {
              const params = {
                //@ts-ignore: Unreachable code error
                groupId: dataModalResponseAskJoinGroup.groupId,
                status: 'ACCEPTED',
              }

              const { data } = await axios.patch(
                `/groups?${queryString.stringify(params)}`,
                {
                  //@ts-ignore: Unreachable code error
                  memberIds: [dataModalResponseAskJoinGroup.senderId],
                }
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'Already in the group.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            } finally {
              setDataModalResponseAskJoinGroup({})
            }
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseAskJoinTeam = (props) => {
  const [dataModalResponseAskJoinTeam, setDataModalResponseAskJoinTeam] =
    useAtom(dataModalResponseAskJoinTeamAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseAskJoinTeam({})
      }}
      open={!isEmpty(dataModalResponseAskJoinTeam)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseAskJoinTeam({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseAskJoinTeam.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseAskJoinTeam.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseAskJoinTeam.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Button
          onClick={async () => {
            try {
              const params = {
                //@ts-ignore: Unreachable code error
                teamId: dataModalResponseAskJoinTeam.teamId,
                status: 'REJECTED',
              }

              const { data } = await axios.patch(
                `/teams?${queryString.stringify(params)}`,
                {
                  //@ts-ignore: Unreachable code error
                  memberIds: [dataModalResponseAskJoinTeam.senderId],
                }
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'Already in the team.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            } finally {
              setDataModalResponseAskJoinTeam({})
            }
          }}
          fullWidth
          size="large"
          sx={{ mr: 2 }}
          variant="outlined"
        >
          No
        </Button>
        <Button
          onClick={async () => {
            try {
              const params = {
                //@ts-ignore: Unreachable code error
                teamId: dataModalResponseAskJoinTeam.teamId,
                status: 'ACCEPTED',
              }

              const { data } = await axios.patch(
                `/teams?${queryString.stringify(params)}`,
                {
                  //@ts-ignore: Unreachable code error
                  memberIds: [dataModalResponseAskJoinTeam.senderId],
                }
              )
              notiToast({
                message: data || 'Success',
                type: 'success',
              })
            } catch (error) {
              let statusCode = error?.response?.data?.statusCode
              if (statusCode === 404) {
                notiToast({
                  message: 'Already in the team.',
                  type: 'error',
                })
              } else {
                notiToast({
                  message: getErrorMessage(error),
                  type: 'error',
                })
              }
            } finally {
              setDataModalResponseAskJoinTeam({})
            }
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseTeamTraining = (props) => {
  const [diary, setDiary] = useAtom(diaryAtom)
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(
    openModalDiaryUpdateAtom
  )
  const [date, setDate] = useAtom(dateAtom)

  const [dataModalResponseTeamTraining, setDataModalResponseTeamTraining] =
    useAtom(dataModalResponseTeamTrainingAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseTeamTraining({})
      }}
      open={!isEmpty(dataModalResponseTeamTraining)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseTeamTraining({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseTeamTraining.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseTeamTraining.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseTeamTraining.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[16px] xl:px-[24px] mb-[20px] gap-x-4 justify-between ">
        <Link href="/dashboard?d=overview">
          <a
            onClick={() => {
              setDataModalResponseTeamTraining({})
            }}
            className="w-full "
          >
            <Button fullWidth size="large" variant="outlined">
              No
            </Button>
          </a>
        </Link>

        <Button
          onClick={async () => {
            setDataModalResponseTeamTraining({})

            //@ts-ignore: Unreachable code error
            const { playerDiaryData }: { playerDiary: any } =
              dataModalResponseTeamTraining

            setOpenModalDiaryUpdate(true)
            await wait(150)
            setDate(new Date(playerDiaryData.updatedAt))
            await wait(150)
            setDiary(playerDiaryData)
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseMatch = (props) => {
  const [diary, setDiary] = useAtom(diaryAtom)
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(
    openModalDiaryUpdateAtom
  )
  const [date, setDate] = useAtom(dateAtom)

  const [dataModalResponseMatch, setDataModalResponseMatch]: any = useAtom(
    dataModalResponseMatchAtom
  )
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseMatch({})
      }}
      open={!isEmpty(dataModalResponseMatch)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseMatch({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseMatch?.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseMatch?.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseMatch?.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[16px] xl:px-[24px] mb-[20px] gap-x-4 justify-between ">
        <Link href="/dashboard?d=training">
          <a
            onClick={() => {
              setDataModalResponseMatch({})
            }}
            className="w-full "
          >
            <Button fullWidth size="large" variant="outlined">
              No
            </Button>
          </a>
        </Link>

        <Button
          onClick={async () => {
            setDataModalResponseMatch({})

            //@ts-ignore: Unreachable code error
            const { playerDiaryData }: { playerDiary: any } =
              dataModalResponseMatch

            setOpenModalDiaryUpdate(true)
            await wait(150)
            setDate(new Date(playerDiaryData.updatedAt))
            await wait(150)
            setDiary(playerDiaryData)
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}

export const ModalResponseCoachReview = (props) => {
  const [diary, setDiary] = useAtom(diaryAtom)
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] = useAtom(
    openModalDiaryUpdateAtom
  )
  const [date, setDate] = useAtom(dateAtom)
  const [dataModalResponseCoachReview, setDataModalResponseCoachReview] =
    useAtom(dataModalResponseCoachReviewAtom)
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => {
        setDataModalResponseCoachReview({})
      }}
      open={!isEmpty(dataModalResponseCoachReview)}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Zporter</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            setDataModalResponseCoachReview({})
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          height: 500,
        }}
      >
        {/*  */}

        <img
          //@ts-ignore: Unreachable code error
          src={dataModalResponseCoachReview.img}
          className=" w-[320px] h-auto block mx-auto "
          alt=""
        />
        <div className="h-[16px] "></div>
        <div className="font-Inter text-center ">
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseCoachReview.title}
          </div>
          <div className=" ">
            {/* @ts-ignore: Unreachable code error */}
            {dataModalResponseCoachReview.body}
          </div>
        </div>

        {/*  */}
      </DialogContent>

      <div className="flex mt-4 px-[24px] mb-[20px] ">
        <Link href="/dashboard?d=training">
          <a
            onClick={() => {
              setDataModalResponseCoachReview({})
            }}
            className="w-full "
          >
            <Button fullWidth size="large" variant="outlined">
              No
            </Button>
          </a>
        </Link>

        <Button
          onClick={async () => {
            setDataModalResponseCoachReview({})

            //@ts-ignore: Unreachable code error
            const { playerDiaryData }: { playerDiary: any } =
              dataModalResponseCoachReview

            debugger
            setOpenModalDiaryUpdate(true)
            await wait(150)
            setDate(new Date(playerDiaryData.updatedAt))
            await wait(150)
            setDiary(playerDiaryData)
          }}
          fullWidth
          size="large"
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Dialog>
  )
}
