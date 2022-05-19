import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'

// export const getBiographyPlayerAtom = atom(async (get) => {
//   const { playerProfile } = useAuth()
//   const response = await axios.get(
//     `${API_GET_BIOGRAPHY_PLAYER}?userIdQuery=${playerProfile.userId}`
//   )
//   return await response.data
// })

export const dataStatsAtom = atom([])

export const idHead2HeadAtom = atom(undefined)
export const loadingHead2HeadAtom = atom(false)
// const [loadingHead2Head, setLoadingHead2Head] = useAtom(loadingHead2HeadAtom)

export const useIdHead2HeadQuery = () => {
  const [idHead2Head, setIdHead2Head]: any = useAtom(idHead2HeadAtom)
  const [idHead2HeadQuery, setIdHead2HeadQuery] = useQueryParam(
    'compareWith',
    StringParam
  )

  useEffect(() => {
    setIdHead2Head(idHead2HeadQuery)
  }, [idHead2HeadQuery])

  return { idHead2Head, setIdHead2Head: setIdHead2HeadQuery }
}

// const {idHead2Head, setIdHead2Head} = useIdHead2HeadQuery()
