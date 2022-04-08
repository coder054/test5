import { atom } from 'jotai'
import { API_GET_BIOGRAPHY_PLAYER } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { useAuth } from '../module/authen/auth/AuthContext'

export const notificationsAtom = atom([])
// const [notifications, setNotifications] = useAtom(notificationsAtom)
