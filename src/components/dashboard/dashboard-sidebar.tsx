import type { Theme } from '@mui/material'
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material'
import { isEmpty } from 'lodash'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { ReactNode, useEffect, useMemo } from 'react'
import type { TFunction } from 'react-i18next'
import { useTranslation } from 'react-i18next'
import { DevelopmentIcon } from 'src/icons/developmentIcon'
import { ExclamationCircle } from 'src/icons/exclamation-circle'
import { Home } from 'src/icons/home'
import { MessagesIcon } from 'src/icons/messagesIcon'
import { Newspaper } from 'src/icons/newspaper'
import { Users } from 'src/icons/users'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { getStr } from 'src/utils/utils'
import { UserCircle } from '../../icons/user-circle'
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

const getSections = (t: TFunction, infoActiveProfile): Section[] => {
  const firstname = getStr(infoActiveProfile, 'firstName')
    .toLowerCase()
    .replaceAll(' ', '')
  const lastname = getStr(infoActiveProfile, 'lastName')
    .toLowerCase()
    .replaceAll(' ', '')
  const fullname = `${firstname}.${lastname}`

  return [
    {
      title: t(''),
      items: [
        {
          title: t('Feed'),
          path: '/feed',
          icon: <Newspaper fontSize="small" />,
        },
        {
          title: t('Dashboard'),
          path: '/dashboard',
          icon: <Home fontSize="small" />,
        },
        {
          title: t('Contacts'),
          path: '/contacts',
          icon: <Users fontSize="small" />,
        },
        {
          title: t('Messages'),
          path: `/chat`,
          icon: <MessagesIcon fontSize="small" />,
        },
        {
          title: t('Biography'),
          path: `/${infoActiveProfile.role === 'COACH' ? 'coach' : 'player'}/${
            infoActiveProfile.username
          }/${fullname}`, // current
          icon: <UserCircle fontSize="small" />,
          disabled: isEmpty(infoActiveProfile),
        },
        {
          title: t('Support'),
          path: `/faqs`,
          icon: <ExclamationCircle fontSize="small" />,
        },
      ],
    },
  ]
}

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { infoActiveProfile } = useAuth()
  const { onClose, open } = props
  const router = useRouter()
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  })
  const sections = useMemo(() => {
    return getSections(t, infoActiveProfile)
  }, [t, infoActiveProfile])
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
