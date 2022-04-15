import { useState, useEffect, useMemo } from 'react'
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
  Checkbox,
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
  loadingChatRoomsAtom,
  useActiveRoomId,
} from 'src/atoms/chatAtom'
import { AllTab } from './AllTab'
import { UnreadTab } from './UnreadTab'
import { RequestsTab } from './RequestsTab'
import { UploadImage } from 'src/components/upload-image'
import { axios } from 'src/utils/axios'
import { Loading } from 'src/components/loading/loading'
import { getStr, truncateStr } from 'src/utils/utils'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { chain, isEmpty } from 'lodash'
import {
  createGroupChatRoom,
  ERoomType,
  updateMessageStatus,
} from 'src/modules/chat/chatService'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  const { currentRoleId } = useAuth()
  const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
  const [activeChatRoom] = useAtom(activeChatRoomAtom)
  const [loadingChatRooms, setLoadingChatRooms] = useAtom(loadingChatRoomsAtom)
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
        <Button
          onClick={handleGroupClick}
          startIcon={<PlusIcon />}
          variant="contained"
        >
          Group
        </Button>
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
            {loadingChatRooms ? (
              <div className="flex h-[70px] justify-center items-center ">
                <CircularProgress />
              </div>
            ) : isEmpty(chatRooms) ? (
              <div
                className=" 
                h-[calc(100vh_-_260px)]
                sm:h-[calc(100vh_-_260px)]
                md:h-[calc(100vh_-_260px)]
                lg:h-[calc(100vh_-_260px)]
                xl:h-[calc(100vh_-_260px)]
              text-center flex items-center "
              >
                <div className="grow ">
                  <div className="mb-2 mx-auto flex justify-center items-center w-[40px] h-[40px] border-[2px] text-Grey border-Grey rounded-full ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>

                  <div className="font-semibold ">No messages yet</div>
                  <div className="text-Grey text-[13px] ">
                    All messages will show up here
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chatRooms.map((chatRoom) => (
                  <ChatThreadItem
                    active={activeChatRoomId === chatRoom.chatRoomId}
                    key={'chatRoom-' + chatRoom.chatRoomId}
                    onSelect={() => {
                      updateMessageStatus(chatRoom.chatRoomId, currentRoleId)
                      setActiveChatRoomId(chatRoom.chatRoomId)
                    }}
                    chatRoom={chatRoom}
                  />
                ))}
              </>
            )}
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
  const { currentRoleId } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [keyword, setKeyword] = useState('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [privateGroup, setPrivateGroup] = useState(true)
  const [keywordDebounce] = useDebounce(keyword, 300)
  const [membersResult, setMembersResult] = useState([])

  const [selectedMembers, setSelectedMembers] = useState([])
  const [loadingMembers, setLoadingMembers] = useState(false)

  useEffect(() => {
    const searchMembers = async () => {
      setLoadingMembers(true)
      const { data } = await axios.get(
        `/contact-groups/get-list-contacts?limit=10&sorted=asc&startAfter=0&search=${keywordDebounce}&tab=ALL`
      )
      setMembersResult(data.data)
      setLoadingMembers(false)
    }
    if (!keywordDebounce) {
      return
    }
    searchMembers()
  }, [keywordDebounce])

  // useEffect(() => {
  //   console.log('aaa membersResult: ', membersResult)
  // }, [membersResult])

  const selectedIdMembers: string[] = useMemo(() => {
    return selectedMembers.map((member) => {
      return member.userId
    })
  }, [selectedMembers])

  const resetModalAddGroup = () => {
    setName('')
    setKeyword('')
    setImageUrl('')
    setPrivateGroup(true)
    setMembersResult([])
    setSelectedMembers([])
    setLoadingMembers(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          // boxShadow:
          //   '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(31, 41, 55, 0.06)',
          // backdropFilter: 'blur(68px)',
          // background: 'rgba(32, 33, 40, 0.8)',

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
          label="Group name"
          name="groupName"
          value={name}
          onChange={(e) => {
            //@ts-ignore: Unreachable code error
            setName(e.target.value)
          }}
        />

        <div className="h-[16px] "></div>

        <div className="flex gap-x-[20px] ">
          {selectedMembers.map((member, index) => (
            <div
              key={index}
              onClick={() => {
                let findIndex = selectedMembers.findIndex((o) => {
                  return o.userId === member.userId
                })
                const selectedMembersClone = [...selectedMembers]
                selectedMembersClone.splice(findIndex, 1)
                setSelectedMembers(selectedMembersClone)
              }}
              className="w-[40px] h-[40px] relative cursor-pointer  "
            >
              <img
                src={member.faceImage}
                className="rounded-[8px] w-[35px] h-[35px] "
                alt=""
              />

              <div className="absolute z-10 right-[-8px] top-[-8px] rounded-full w-[16px] h-[16px] bg-white text-black flex items-center justify-center select-none ">
                x
              </div>
            </div>
          ))}
        </div>

        <div className="h-[16px] "></div>

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
        <div className="h-[12px] "></div>
        <ResultMembers
          loading={loadingMembers}
          members={membersResult}
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
        />

        <div className="h-[16px] "></div>

        <div className=" ">Group Image</div>
        <UploadImage
          text="Add photo"
          className="text-center w-full max-w-[300px] "
          classNameInner="border-[#00000000] "
          setImage={setImageUrl}
        />
        <div className="h-[16px] "></div>
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
        <div className="h-[16px] "></div>
        <div className="flex ">
          <Button
            onClick={() => {
              setOpen(false)
              resetModalAddGroup()
            }}
            fullWidth
            size="large"
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (!name) {
                alert('Name is required')
                return
              }

              if (selectedIdMembers.length < 2) {
                alert('Please add at least 2 members to your group')
                return
              }

              try {
                const {
                  data,
                }: {
                  data: {
                    groupId: string
                    acceptedMemberIds: string[]
                  }
                } = await axios.post('/groups', {
                  name,
                  groupImage: imageUrl,
                  isPrivate: privateGroup,
                  memberIds: selectedIdMembers,
                })
                setOpen(false)
                resetModalAddGroup()

                await createGroupChatRoom(
                  data.groupId,
                  name,
                  false,
                  chain([...data.acceptedMemberIds, currentRoleId])
                    .compact()
                    .uniq()
                    .value(),
                  imageUrl,
                  ERoomType.GROUP
                )
                setTimeout(() => {
                  router.push(`/dashboard/chat?roomId=${data.groupId}`)
                }, 200)
              } catch (error) {}
            }}
            fullWidth
            size="large"
            variant="contained"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

const ResultMembers = ({
  loading,
  members,
  selectedMembers,
  setSelectedMembers,
}: {
  loading: boolean
  members: IMember[]
  selectedMembers: IMember[]
  setSelectedMembers: (list: IMember[]) => void
}) => {
  return (
    <div className="">
      <div className=" flex ">
        <div className="w-[20px] ">
          {loading ? (
            <Loading size={10}></Loading>
          ) : (
            <span className="text-Green mr-[8px] ">{members.length}</span>
          )}
        </div>
        <span className="text-Grey ">members found</span>
      </div>
      <div className="h-[12px] "></div>

      <div className="max-h-[300px] py-[4px] overflow-y-auto ">
        {members.map((member, index) => (
          <div key={index} className="mb-[30px] flex w-full items-center ">
            <img
              src={member.faceImage}
              className="w-[65px] h-[65px] object-cover rounded-[8px] mr-3"
              alt=""
            />
            <div className=" w-[200px] ">
              <div className="text-white font-semibold ">
                {member.firstName} {member.lastName}{' '}
              </div>
              <div className="flex justify-between ">
                <span className="text-Grey ">#{member.username}</span>
                <span className="text-Grey ">
                  {getStr(member, 'favoriteRoles[0]')}
                </span>
              </div>

              <div className="flex justify-between ">
                <span className="text-white ">
                  {truncateStr(member.city || '', 11)}
                </span>
                <span className="text-white ">
                  {getStr(member, 'clubName')}{' '}
                </span>
              </div>
            </div>
            <div className="grow "></div>
            <Checkbox
              checked={selectedMembers
                .map((o) => o.userId)
                .includes(member.userId)}
              onChange={(event) => {
                // if currently checked
                if (
                  selectedMembers.map((o) => o.userId).includes(member.userId)
                ) {
                  let findIndex = selectedMembers.findIndex((o) => {
                    return o.userId === member.userId
                  })
                  const selectedMembersClone = [...selectedMembers]
                  selectedMembersClone.splice(findIndex, 1)
                  setSelectedMembers(selectedMembersClone)
                } else {
                  // if currently unchecked
                  setSelectedMembers([...selectedMembers, member])
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <div className="w-[8px] "></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Generated by https://quicktype.io

export interface IMember {
  isActive: boolean
  birthCountry: BirthCountry
  clubId: string
  firstName: string
  fcmToken: any[]
  city: string
  favoriteRoles: string[]
  currentTeams: string[]
  lastName: string
  faceImage: string
  username: string
  type: string
  userId: string
  isOnline: boolean
  clubName: string
  timezone: string
  lastActive: number
  birthDay: string
  createdAt: number
  updatedAt: number
  shirtNumber: number
  isRelationship: boolean
  isPublic: boolean
  notificationOn: boolean
  notificationOptions: NotificationOptions
}

export interface BirthCountry {
  region: string
  alpha2Code: string
  flag: string
  alpha3Code: string
  name: string
}

export interface NotificationOptions {
  inviteUpdates: boolean
  feedUpdates: boolean
  messageUpdates: boolean
  profileAndDiaryUpdates: boolean
}
