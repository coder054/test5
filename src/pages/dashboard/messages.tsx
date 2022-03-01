// import { Box, Container, Divider, Tab, Tabs } from '@mui/material'

// import type { NextPage } from 'next'
// import { requireAuth } from 'src/config/firebase-admin'
// import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'

// const Messages: NextPage = () => {
//   return <div className="text-white ">messages</div>
// }

// Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

// export const getServerSideProps: any = async ({ req, res }) => {
//   await requireAuth(req as any, res as any)
//   return { props: {} }
// }

// export default Messages

import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import type { Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChatComposer } from 'src/components/dashboard/chat/chat-composer'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { ChatSidebar } from 'src/components/dashboard/chat/chat-sidebar'
import { ChatThread } from 'src/components/dashboard/chat/chat-thread'
import { useDispatch } from 'react-redux'
import { getThreads } from 'src/slices/chat'
import { gtm } from 'src/lib/gtm'
import { MenuAlt4 } from 'src/icons/menu-alt-4'
import { ChatAlt2 } from 'src/icons/chat-alt2'

const ChatInner = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    marginLeft: -380,
  },
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

// In our case there two possible routes
// one that contains /chat and one with a chat?threadKey={{threadKey}}
// if threadKey does not exist, it means that the chat is in compose mode

const Chat: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const compose = (router.query.compose as string) === 'true'
  const threadKey = router.query.threadKey as string
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), {
    noSsr: true,
  })

  useEffect(() => {
    gtm.push({ event: 'page_view' })
  }, [])

  useEffect(
    () => {
      dispatch(getThreads())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!mdUp) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [mdUp])

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }

  if (!router.isReady) {
    return null
  }

  const view = threadKey ? 'thread' : compose ? 'compose' : 'blank'

  return (
    <>
      <Box
        component="main"
        sx={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div className="text-white ">aaaaaaaaaaaaaaaaaaaaa</div>
        <Box
          ref={rootRef}
          sx={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <ChatSidebar
            containerRef={rootRef}
            onClose={handleCloseSidebar}
            open={isSidebarOpen}
          />
          <ChatInner open={isSidebarOpen}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderBottomColor: 'divider',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                display: 'flex',
                p: 2,
              }}
            >
              <IconButton onClick={handleToggleSidebar}>
                {/* icon */}
                <MenuAlt4 fontSize="small" />
              </IconButton>
            </Box>
            {view === 'thread' && <ChatThread threadKey={threadKey} />}
            {view === 'compose' && <ChatComposer />}
            {view === 'blank' && (
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    height: 56,
                    width: 56,
                  }}
                >
                  {/* icon */}
                  <ChatAlt2 fontSize="small" />
                </Avatar>
                <Typography
                  color="textSecondary"
                  sx={{ mt: 2 }}
                  variant="subtitle1"
                >
                  Start meaningful conversations!
                </Typography>
              </Box>
            )}
          </ChatInner>
        </Box>
      </Box>
    </>
  )
}

Chat.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Chat