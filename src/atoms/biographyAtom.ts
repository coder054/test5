import { atom } from 'jotai'

// export const getBiographyPlayerAtom = atom(async (get) => {
//   const { playerProfile } = useAuth()
//   const response = await axios.get(
//     `${API_GET_BIOGRAPHY_PLAYER}?userIdQuery=${playerProfile.userId}`
//   )
//   return await response.data
// })

export const dataStatsAtom = atom([])
