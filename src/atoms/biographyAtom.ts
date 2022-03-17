import { atom } from 'jotai'
import { API_GET_BIOGRAPHY_PLAYER } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { useAuth } from '../module/authen/auth/AuthContext'

// export const getBiographyPlayerAtom = atom(async (get) => {
//   const { playerProfile } = useAuth()
//   console.log('userId', playerProfile.userId)
//   const response = await axios.get(
//     `${API_GET_BIOGRAPHY_PLAYER}?userIdQuery=${playerProfile.userId}`
//   )
//   return await response.data
// })

export const dataStatsAtom = atom([])
