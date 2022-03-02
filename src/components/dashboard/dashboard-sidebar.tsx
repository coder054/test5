import type { Theme } from '@mui/material'
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material'
import { get, isEmpty } from 'lodash'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { ReactNode, useEffect, useMemo } from 'react'
import type { TFunction } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from 'src/constants/constants'
import { Cog } from 'src/icons/cog'
import { MessagesIcon } from 'src/icons/messagesIcon'
import { Newspaper } from 'src/icons/newspaper'
import { Users } from 'src/icons/users'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { getStr } from 'src/utils/utils'
import {
  UserCircle,
  UserCircle as UserCircleIcon,
} from '../../icons/user-circle'
import { ContactsIcon } from '../icons'
import { Logo } from '../logo'
import { Scrollbar } from '../scrollbar'
import { DashboardSidebarSection } from './dashboard-sidebar-section'

interface DashboardSidebarProps {
  onClose: () => void
  open: boolean
}

interface Item {
  title: string
  children?: Item[]
  chip?: ReactNode
  icon?: ReactNode
  path?: string
  disabled?: boolean
}

interface Section {
  title: string
  items: Item[]
}

const getSections = (t: TFunction, playerProfile): Section[] => {
  let currentRoleLocalStorage = ''
  if (typeof window !== 'undefined') {
    currentRoleLocalStorage =
      window.localStorage.getItem(LOCAL_STORAGE_KEY.currentRoleId) || ''
  }

  const firstname = getStr(playerProfile, 'profile.firstName')
    .toLowerCase()
    .replaceAll(' ', '')
  const lastname = getStr(playerProfile, 'profile.lastName')
    .toLowerCase()
    .replaceAll(' ', '')
  const fullname = `${firstname}.${lastname}`

  return [
    {
      title: t(''),
      items: [
        {
          title: t('Feed'),
          path: '/dashboard/news',
          icon: <Newspaper fontSize="small" />,
        },
        // {
        //   title: t('Account and Settings'),
        //   path: '/dashboard/account',
        //   icon: <Cog fontSize="small" />,
        // },
        {
          title: t('Biography'),
          path: `/biography/${playerProfile.username}/${fullname}`, // current
          icon: <UserCircle fontSize="small" />,
          disabled: isEmpty(playerProfile),
        },
        {
          title: t('Contacts'),
          path: '/contacts',
          icon: <Users fontSize="small" />,
        },
        {
          title: t('Messages'),
          path: `/dashboard/messages`,
          icon: <MessagesIcon fontSize="small" />,
        },
      ],
    },
  ]
}

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { playerProfile } = useAuth()
  const { onClose, open } = props
  const router = useRouter()
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  })
  const sections = useMemo(() => {
    return getSections(t, playerProfile)
  }, [t, playerProfile])
  const handlePathChange = () => {
    if (!router.isReady) {
      return
    }

    if (open) {
      onClose?.()
    }
  }

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  )

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/dashboard" passHref>
                <a>
                  <Logo />
                </a>
              </NextLink>
            </Box>
          </div>
          {/* <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
              my: 3,
            }}
          /> */}
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />
        </Box>
      </Scrollbar>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) =>
              theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
