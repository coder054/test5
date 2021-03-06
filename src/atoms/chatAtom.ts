import { atom, useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

export const chatRoomsAtom = atom([])
export const listRoomIdOpenFromOtherPagesAtom = atom([])

const activeChatRoomIdAtom = atom('')

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
export const notiListAtom = atom([])

export const useActiveRoomId = () => {
  const [activeChatRoomId, setActiveChatRoomId] = useAtom(activeChatRoomIdAtom)
  const [roomId, setRoomId] = useQueryParam('roomId', StringParam)

  useEffect(() => {
    setActiveChatRoomId(roomId)
  }, [roomId])

  return { activeChatRoomId, setActiveChatRoomId: setRoomId }
}

export const loadingChatRoomsAtom = atom(true)

// const [loadingChatRooms, setLoadingChatRooms] = useAtom(loadingChatRoomsAtom)
// const [activeChatRoom] = useAtom(activeChatRoomAtom)
// const { activeChatRoomId, setActiveChatRoomId } = useActiveRoomId()
// const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)

// const [notiList, setNotiList] = useAtom(notiListAtom)

// const [listRoomIdOpenFromOtherPages, setListRoomIdOpenFromOtherPages] = useAtom(
//   listRoomIdOpenFromOtherPagesAtom
// )
