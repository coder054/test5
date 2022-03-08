import { atom, useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

export const chatRoomsAtom = atom([])
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

export const useActiveRoomId = () => {
  const [activeChatRoomId, setActiveChatRoomId] = useAtom(activeChatRoomIdAtom)
  const [roomId, setRoomId] = useQueryParam('roomId', StringParam)

  useEffect(() => {
    setActiveChatRoomId(roomId)
  }, [roomId])

  return { activeChatRoomId, setActiveChatRoomId: setRoomId }
}

// const [activeChatRoom] = useAtom(activeChatRoomAtom)
// const { activeChatRoomId, setActiveChatRoomId } = useActiveRoomId()
// const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
