import { getDatabase, orderByChild, query, ref } from 'firebase/database'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useList } from 'react-firebase-hooks/database'
import { chatRoomsAtom, loadingChatRoomsAtom } from 'src/atoms/chatAtom'
import { firebaseApp } from 'src/config/firebase-client'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { getChatRoomStream } from 'src/modules/chat/chatService'

const database = getDatabase(firebaseApp)
const dbRef = ref(getDatabase())

export const AllTab = () => {
  const { currentRoleId } = useAuth()

  const [results, setResults] = useState<any>(null)
  const [firstRender, setFirstRender] = useState(true)
  const [snapshots, loading, error] = useList(
    query(ref(database, 'chatRooms'), orderByChild('updatedAt'))
  )
  const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom)
  const [, setLoadingChatRooms] = useAtom(loadingChatRoomsAtom)

  useEffect(() => {
    if (isEmpty(snapshots) || isEmpty(currentRoleId)) {
      setChatRooms([])
      return
    }

    ;(async () => {
      try {
        if (firstRender === true) {
          setLoadingChatRooms(true)
          setFirstRender(false)
        }
        const { data, error } = await getChatRoomStream(
          snapshots,
          currentRoleId
        )

        setChatRooms(data.filter((o) => o.isShowChatRoom))
      } catch (error) {
      } finally {
        setLoadingChatRooms(false)
      }
    })()
  }, [snapshots, currentRoleId])

  return null
}
