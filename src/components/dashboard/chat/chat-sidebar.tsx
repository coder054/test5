import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import type { ChangeEvent, FC, MutableRefObject } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import {
  Drawer,
  List,
  Typography,
  useMediaQuery,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Modal,
  Switch,
} from '@mui/material'

import { Search as SearchIcon } from '../../../icons/search'

import type { Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { chatApi } from '../../../__fake-api__/chat-api'
import { Plus as PlusIcon } from '../../../icons/plus'
import { X as XIcon } from '../../../icons/x'
import { useSelector } from '../../../store'
import type { Contact } from '../../../types/chat'
import { Scrollbar } from '../../scrollbar'
import { ChatContactSearch } from './chat-contact-search'
import { ChatThreadItem } from './chat-thread-item'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { ETabChat, tabsChat } from 'src/pages/dashboard/chat'
import { useAtom } from 'jotai'
import {
  activeChatRoomAtom,
  chatRoomsAtom,
  useActiveRoomId,
} from 'src/atoms/chatAtom'
import { AllTab } from './AllTab'
import { UnreadTab } from './UnreadTab'
import { RequestsTab } from './RequestsTab'
import { UploadImage } from 'src/components/upload-image'
import { axios } from 'src/utils/axios'

interface ChatSidebarProps {
  tab: any
  setTab: any
  containerRef?: MutableRefObject<HTMLDivElement>
  onClose?: () => void
  open?: boolean
}

const ChatSidebarDesktop = styled(Drawer)({
  flexShrink: 0,
  width: 380,
  '& .MuiDrawer-paper': {
    position: 'relative',
    width: 380,
  },
})

const ChatSidebarMobile = styled(Drawer)({
  maxWidth: '100%',
  width: 380,
  '& .MuiDrawer-paper': {
    height: 'calc(100% - 64px)',
    maxWidth: '100%',
    top: 64,
    width: 380,
  },
})

export const ChatSidebar: FC<ChatSidebarProps> = (props) => {
  const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
  const [activeChatRoom] = useAtom(activeChatRoomAtom)
  const { activeChatRoomId, setActiveChatRoomId } = useActiveRoomId()
  const { containerRef, onClose, open, tab, setTab, ...other } = props
  const router = useRouter()
  const { threads, activeThreadId } = useSelector((state) => state.chat)
  const [openModalCreateGroup, setOpenModalCreateGroup] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Contact[]>([])
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleGroupClick = (): void => {
    // <TextField
    //     autoFocus
    //     error={Boolean(formik.touched.email && formik.errors.email)}
    //     fullWidth
    //     helperText={formik.touched.email && formik.errors.email}
    //     label="Email Address"
    //     margin="normal"
    //     name="email"
    //     onBlur={formik.handleBlur}
    //     onChange={formik.handleChange}
    //     type="email"
    //     value={formik.values.email}
    //   />
    if (!mdUp) {
      onClose?.()
    }
    setOpenModalCreateGroup(true)
  }

  const handleSearchClickAway = (): void => {
    setIsSearchFocused(false)
    setSearchQuery('')
  }

  const handleSearchChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const { value } = event.target

      setSearchQuery(value)

      if (value) {
        const data = await chatApi.getContacts(value)

        setSearchResults(data)
      } else {
        setSearchResults([])
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSearchFocus = (): void => {
    setIsSearchFocused(true)
  }

  const handleSearchSelect = (result: any): void => {
    setIsSearchFocused(false)
    setSearchQuery('')

    if (!mdUp) {
      onClose?.()
    }

    router.push(`/dashboard/chat?threadKey=${result.id}`)
  }

  const handleSelectThread = (threadId: string): void => {
    const thread = threads.byId[threadId]
    let threadKey

    if (thread.type === 'GROUP') {
      threadKey = thread.id
    } else {
      // We hardcode the current user ID because the mocked that is not in sync
      // with the auth provider.
      // When implementing this app with a real database, replace this
      // ID with the ID from Auth Context.
      threadKey = thread.participantIds.find(
        (participantId) => participantId !== '5e86809283e28b96d2d38537'
      )
    }

    if (!mdUp) {
      onClose?.()
    }

    router.push(`/dashboard/chat?threadKey=${threadKey}`)
  }

  // content of sidebar chat
  const content = (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          p: 2,
        }}
      >
        <Typography variant="h5">Chats</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <NextLink href="/dashboard/chat?compose=true" passHref>
          <Button
            component="a"
            onClick={handleGroupClick}
            startIcon={<PlusIcon />}
            variant="contained"
          >
            Group1
          </Button>
        </NextLink>
        <IconButton
          onClick={onClose}
          sx={{
            display: {
              sm: 'none',
            },
            ml: 2,
          }}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Tabs All Unread Requested */}
      <Tabs tab={tab} setTab={setTab} tabs={tabsChat} />
      <TabPanel unmount={true} visible={tab === ETabChat.All}>
        <AllTab />
      </TabPanel>
      <TabPanel unmount={true} visible={tab === ETabChat.Unread}>
        <UnreadTab />
      </TabPanel>
      <TabPanel unmount={true} visible={tab === ETabChat.Requests}>
        <RequestsTab />
      </TabPanel>

      {/* <ChatContactSearch
        isFocused={isSearchFocused}
        onChange={handleSearchChange}
        onClickAway={handleSearchClickAway}
        onFocus={handleSearchFocus}
        onSelect={handleSearchSelect}
        query={searchQuery}
        results={searchResults}
      /> */}
      <Box
        sx={{
          borderTopColor: 'divider',
          borderTopStyle: 'solid',
          borderTopWidth: 1,
          display: isSearchFocused ? 'none' : 'block',
        }}
      >
        <Scrollbar>
          <List disablePadding>
            {/* map all chatRooms */}
            {/* {threads.allIds.map((threadId) => (
              <ChatThreadItem
                active={activeThreadId === threadId}
                key={threadId}
                onSelect={(): void => handleSelectThread(threadId)}
                thread={threads.byId[threadId]}
              />
            ))} */}
            {chatRooms.map((chatRoom) => (
              <ChatThreadItem
                active={activeChatRoomId === chatRoom.chatRoomId}
                key={'chatRoom-' + chatRoom.chatRoomId}
                onSelect={() => {
                  setActiveChatRoomId(chatRoom.chatRoomId)
                }}
                chatRoom={chatRoom}
              />
            ))}
          </List>
        </Scrollbar>
      </Box>
    </div>
  )

  if (mdUp) {
    return (
      <>
        <ModalCreateGroup
          open={openModalCreateGroup}
          setOpen={setOpenModalCreateGroup}
        />
        <ChatSidebarDesktop
          anchor="left"
          open={open}
          SlideProps={{ container: containerRef?.current }}
          variant="persistent"
          {...other}
        >
          {content}
        </ChatSidebarDesktop>
      </>
    )
  }

  return (
    <>
      <ModalCreateGroup
        open={openModalCreateGroup}
        setOpen={setOpenModalCreateGroup}
      />
      <ChatSidebarMobile
        anchor="left"
        ModalProps={{ container: containerRef?.current }}
        onClose={onClose}
        open={open}
        SlideProps={{ container: containerRef?.current }}
        variant="temporary"
        {...other}
      >
        {content}
      </ChatSidebarMobile>
    </>
  )
}

ChatSidebar.propTypes = {
  containerRef: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}

const ModalCreateGroup = ({ open, setOpen }) => {
  const [name, setName] = useState('')
  const [keyword, setKeyword] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [checked, setChecked] = useState(true)
  const [privateGroup, setPrivateGroup] = useState(true)
  const [keywordDebounce] = useDebounce(keyword, 300)
  const [membersResult, setMembersResult] = useState([])

  useEffect(() => {
    const searchMembers = async () => {
      const { data } = await axios.get(
        `https://dev.api.zporter.co/contact-groups/get-list-contacts?limit=10&sorted=asc&startAfter=0&search=${keywordDebounce}&tab=ALL`
      )
    }
    if (!keywordDebounce) {
      return
    }
    searchMembers()
  }, [keywordDebounce])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          boxShadow:
            '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(31, 41, 55, 0.06)',
          backdropFilter: 'blur(68px)',
          background: 'rgba(32, 33, 40, 0.8)',
        }}
        className="p-[32px] border border-Stroke rounded-[8px] min-h-[400px] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] "
      >
        <TextField
          fullWidth
          label="Group name"
          name="groupName"
          value={name}
          onChange={(e) => {
            //@ts-ignore: Unreachable code error
            setName(e.target.value)
          }}
        />

        <div className="h-[32px] "></div>

        <TextField
          fullWidth
          placeholder="Add members"
          name="searchmembers"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          value={keyword}
          onChange={(e) => {
            //@ts-ignore: Unreachable code error
            setKeyword(e.target.value)
          }}
        />

        <div className="h-[32px] "></div>

        <div className=" ">Group Image</div>
        <UploadImage
          text="Add photo"
          className="text-center w-full max-w-[300px] "
          classNameInner="border-[#00000000] "
          setImage={setImageUrl}
        />
        <div className="h-[32px] "></div>
        <div className="flex w-full justify-between items-center ">
          <Typography variant="body1">Private group</Typography>
          <Switch
            defaultChecked
            edge="start"
            name="isVerified"
            checked={privateGroup}
            onChange={(event) => {
              setPrivateGroup(event.target.checked)
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
