import CircularProgress from '@material-ui/core/CircularProgress'
import type { Theme } from '@mui/material'
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  Modal,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Popover from '@mui/material/Popover'
import { styled } from '@mui/material/styles'
import { useAtom } from 'jotai'
import { chain, get, isEmpty, upperCase } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import type { ChangeEvent, FC, MutableRefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import {
  activeChatRoomAtom,
  chatRoomsAtom,
  loadingChatRoomsAtom,
  useActiveRoomId,
} from 'src/atoms/chatAtom'
import { Loading } from 'src/components/loading/loading'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { UploadImage } from 'src/components/upload-image'
import { REACT_QUERY_KEYS } from 'src/constants/constants'
import { optionAllClub } from 'src/constants/mocks/clubs.constans'
import {
  optionAllCountry,
  optionSweden,
} from 'src/constants/mocks/countries.constants'
import { imgAvatar } from 'src/imports/images'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  createGroupChatRoom,
  ERoomType,
  getChatRoomIdOrCreateIfNotExisted,
  getUrlChatFromChatRoomId,
  updateMessageStatus,
} from 'src/modules/chat/chatService'
import { ModalFilterFriends } from 'src/modules/contacts/components/modals/ModalFilterFriends'
import { ETabChat, tabsChat } from 'src/pages/chat'
import { axios } from 'src/utils/axios'
import { getStr, truncateStr } from 'src/utils/utils'
import { useDebounce } from 'use-debounce'
import { Plus as PlusIcon } from '../../../icons/plus'
import { Search as SearchIcon } from '../../../icons/search'
import { X as XIcon } from '../../../icons/x'
import { useSelector } from '../../../store'
import type { Contact } from '../../../types/chat'
import { chatApi } from '../../../__fake-api__/chat-api'
import { Scrollbar } from '../../scrollbar'
import { AllTab } from './AllTab'
import { ChatThreadItem } from './chat-thread-item'
import { RequestsTab } from './RequestsTab'
import { UnreadTab } from './UnreadTab'

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
  const [openModalCreateMessage, setOpenModalCreateMessage] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Contact[]>([])
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    console.log('aaa chatRooms: ', chatRooms)
  }, [chatRooms])

  useEffect(() => {
    setAnchorEl(null)
  }, [openModalCreateMessage])
  useEffect(() => {
    setAnchorEl(null)
  }, [openModalCreateGroup])

  const handlePersonClick = (): void => {
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
    setOpenModalCreateMessage(true)
  }

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

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)
  const id = openPopover ? 'simple-popover' : undefined

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

  // content of sidebar chat
  const content = (
    <div>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: 280,
            position: 'relative',
          },
        }}
      >
        <div className="py-[5px]">
          <div
            onClick={() => {
              handlePersonClick()
            }}
            className="flex gap-[8px] items-center w-full px-[16px] py-[5px] cursor-pointer hover:bg-[#81838919] mb-[5px] "
          >
            <span className="text-white ">Create message</span>
          </div>
          <div
            onClick={() => {
              handleGroupClick()
            }}
            className="flex gap-[8px] items-center w-full px-[16px] py-[5px] cursor-pointer hover:bg-[#81838919]"
          >
            <span className="text-white ">Create message to a group</span>
          </div>
        </div>
      </Popover>
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
          onClick={handleClick}
          startIcon={<PlusIcon />}
          variant="contained"
        >
          Create
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
        <ModalCreateMessage
          open={openModalCreateMessage}
          setOpen={setOpenModalCreateMessage}
        />
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

const ModalCreateMessage = ({ open, setOpen }) => {
  const { currentRoleId } = useAuth()
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const [role, setRole] = useState<string>('All')
  const roleRef = useRef(role)
  const [keywordDebounce] = useDebounce(keyword, 300)
  const [contractedClub, setContractedClub] = useState(optionAllClub)
  const contractedClubRef = useRef(contractedClub)
  // const [contractedClub, setContractedClub] = useState({
  //   arena: '',
  //   city: '',
  //   clubId: '',
  //   clubName: '',
  //   country: '',
  //   logoUrl: '',
  //   nickName: '',
  //   websiteUrl: null,
  // })
  const [openModalFilter, setOpenModalFilter] = useState(false)
  const [country, setCountry] = useState(optionSweden)
  const countryRef = useRef(country)

  const countryName = useMemo(() => {
    return getStr(countryRef.current, 'name')
  }, [countryRef.current])

  const countryNameDisplayed = useMemo(() => {
    return countryName === 'All' || countryName === ''
      ? 'the world'
      : countryName
  }, [countryName])

  const query = useMemo(() => {
    const params: any = {
      startAfter: 1,
      limit: 100,
      sorted: sort,
      tab: 'ALL',
    }

    if (countryName !== optionAllCountry.name && countryName !== '') {
      params.country = countryName
    }

    const clubId = getStr(contractedClubRef, 'current.clubId')
    if (!!clubId) {
      params.clubId = clubId
    }

    if (!!keywordDebounce) {
      params.search = keywordDebounce
    }
    if (roleRef.current !== 'All' && roleRef.current !== '') {
      params.role = upperCase(roleRef.current || '')
    }

    return queryString.stringify(params)
  }, [
    keywordDebounce,
    countryName,
    sort,
    roleRef.current,
    getStr(contractedClubRef, 'current.clubId'),
  ])

  const { isLoading, error, data } = useQuery(
    [REACT_QUERY_KEYS.contacts_group_create_message, query],
    async () => {
      const { data } = await axios.get(
        `/contact-groups/get-list-contacts?${query}`
      )
      return data
    },
    {
      enabled: !!open,
    }
  )
  const totalUsers = useMemo(() => {
    if (isEmpty(data)) {
      return 0
    }
    return data.count
  }, [data])

  // useEffect(() => {
  //   if (openModalFilter === false) {
  //     roleRef.current = role
  //     countryRef.current = country
  //     contractedClubRef.current = contractedClub
  //   }
  // }, [openModalFilter])

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
        <ModalFilterFriends
          open={openModalFilter}
          onClose={() => {
            setOpenModalFilter(false)
          }}
          country={country}
          setCountry={setCountry}
          contractedClub={contractedClub}
          setContractedClub={setContractedClub}
          role={role}
          setRole={setRole}
          getListContact={() => {
            roleRef.current = role
            countryRef.current = country
            contractedClubRef.current = contractedClub
          }}
          countryRef={countryRef}
        ></ModalFilterFriends>

        <div className="text-white font-Inter ">
          You can only send messages to friends and teammates!
        </div>
        <div className="h-[16px] "></div>

        <TextField
          fullWidth
          placeholder="Search"
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

        <div className="h-[16px] "></div>

        <div className="flex ">
          <p className="text-18px font-bold">
            {isLoading ? (
              <div className="pr-3 inline-block ">
                <Loading size={10}></Loading>
              </div>
            ) : (
              <span className="text-[#09E099] inline-block ">
                {totalUsers == -1 ? 0 : totalUsers}{' '}
              </span>
            )}
            {` ${
              totalUsers === 1 ? 'Friend' : 'Friends'
            } in ${countryNameDisplayed}`}
          </p>

          <div className="grow min-w-[50px] "></div>
          <div className="flex gap-x-[24px] items-center ">
            {sort === 'asc' ? (
              <svg
                onClick={() => {
                  setSort('desc')
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-[24px] cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
              </svg>
            ) : (
              <svg
                onClick={() => {
                  setSort('asc')
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-[24px] w-[24px] cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
              </svg>
            )}

            <svg
              onClick={() => {
                setOpenModalFilter(true)
              }}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 11H16V13H4V11ZM4 6H20V8H4V6ZM4 18H11H11.235V16H11H4V18Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <div className="h-[16px] "></div>

        {/* // here list members */}
        {/*  */}
        <ListContacts
          setOpen={setOpen}
          isLoading={isLoading}
          error={error}
          data={data}
        ></ListContacts>
        {/*  */}
      </div>
    </Modal>
  )
}

const ListContacts = ({ isLoading, error, data, setOpen }) => {
  const router = useRouter()
  const users = isEmpty(get(data, 'data')) ? [] : get(data, 'data')
  const { currentRoleId } = useAuth()
  const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)

  useEffect(() => {
    console.log('aaa users: ', users)
  }, [users])
  if (isLoading) return <CircularProgress />
  if (error)
    return (
      <div className="border ">{'An error has occurred: ' + error.message}</div>
    )
  return (
    <div className="max-h-[400px] overflow-y-auto pr-[20px] ">
      {users.map((user, index) => {
        return (
          <div className="flex w-full my-5 items-center ">
            <img
              className=" w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-lg object-cover object-center inline-block mr-[8px]"
              src={user?.faceImage ? user?.faceImage : imgAvatar}
              alt="Profile Image"
            />
            <div className=" ">
              <div className="font-semibold text-[15px] leading-[147%] ">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-Grey text-[10px] sm:text-[12px] ">
                #{user.username}
              </div>
              <div className="text-white text-[10px] sm:text-[12px] ">
                {truncateStr(getStr(user, 'city'), 20)}
              </div>
            </div>

            <div className="grow-[2] min-w-[20px] "></div>

            <div className=" w-[180px] pr-4 ">
              <div className="h-[22px] "></div>
              <div className="text-Grey text-[10px] sm:text-[12px] text-right">
                {user.type === 'COACH'
                  ? 'Coach'
                  : getStr(user, 'favoriteRoles[0]')}
              </div>
              <div className="text-white text-[10px] sm:text-[12px] text-right ">
                {truncateStr(
                  `${user.clubName}/${getStr(user, 'currentTeams.[0]')}`,
                  30
                )}
              </div>
            </div>
            <div className="grow-[3] min-w-[40px]"></div>

            <div className="flex gap-x-[8px] items-center">
              {user.isRelationship && (
                <svg
                  onClick={async () => {
                    let chatRoomId = await getChatRoomIdOrCreateIfNotExisted(
                      user,
                      currentRoleId
                    )
                    if (!chatRoomId) {
                      return
                    }
                    setOpen(false)

                    if (
                      !chatRooms
                        .map((chatRoom) => chatRoom.chatRoomId)
                        .includes(chatRoomId)
                    ) {
                      let aaaaa = user
                      debugger
                      setChatRooms((prev) => {
                        return [
                          {
                            chatRoomId: chatRoomId,
                            chatRoomImage: user.faceImage,
                            chatRoomName: `${user.firstName} ${user.lastName}`,
                            deletedDate: 0,
                            isGroup: false,
                            isShowChatRoom: true,
                            lastMessageContent: '',
                            lastMessageId: null,
                            memberIds: [currentRoleId, user.userId],
                            requested: false,
                            unReadMessageNumber: 0,
                            updatedAt: +new Date(),
                            userName: user.username,
                          },
                          ...prev,
                        ]
                      })
                    }

                    router.push(getUrlChatFromChatRoomId(chatRoomId))
                  }}
                  className="cursor-pointer "
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                    fill="white"
                  />
                </svg>
              )}
              <Link
                href={`/${user.type === 'COACH' ? 'coach' : 'player'}/${
                  user.username
                }/${user.firstName}.${user.lastName}`}
              >
                <a
                  target={'_blank'}
                  className="cursor-pointer p-1 hover:bg-[#000000] rounded-[4px] "
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.59009 16.59L13.1701 12L8.59009 7.41L10.0001 6L16.0001 12L10.0001 18L8.59009 16.59Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
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
                  router.push(`/chat?roomId=${data.groupId}`)
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
