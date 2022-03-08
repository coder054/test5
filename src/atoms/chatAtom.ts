import { atom } from 'jotai'
import { isEmpty } from 'lodash'

export const chatRoomsAtom = atom([])
export const activeChatRoomIdAtom = atom('')

export const activeChatRoomAtom = atom((get) => {
  const chatRooms = get(chatRoomsAtom)
  const activeChatRoomId = get(activeChatRoomIdAtom)
  if (isEmpty(chatRooms) || isEmpty(activeChatRoomId)) {
    return {}
  }
  return (
    chatRooms.find((chatRoom) => {
      return chatRoom.chatRoomId === activeChatRoomId
    }) || {}
  )
})

// const [activeChatRoom] = useAtom(activeChatRoomAtom)
// const [activeChatRoomId, setActiveChatRoomId] = useAtom(activeChatRoomIdAtom)
// const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
