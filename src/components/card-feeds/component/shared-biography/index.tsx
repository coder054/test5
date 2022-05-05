import { useQuery } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { InfoPlayerWithCircleImage } from 'src/modules/biography/InfoPlayerWithCircleImage'
import { getBioGraphyPlayer } from 'src/service/feed/yours.service'

interface SharedBiographyProps {
  card?: CardFeedType
}

export const SharedBiography = ({ card }: SharedBiographyProps) => {
  const { isLoading: loading, data } = useQuery(
    [QUERIES_FEED.FEED_SHARED_BIOGRAPHY_POST],
    () => getBioGraphyPlayer(card?.bioInfo?.username),
    {
      onSuccess: (res) => {
        // console.log('res bio:', res)
      },
    }
  )

  // useEffect(() => {
  //   const getBio = async () => {
  //     if (profile && profile === 'Player') {
  //       const { data, error } = await updateUserRoles()

  //       const find = data.find((o) => o.role === 'PLAYER')
  //       const username = getStr(find, 'username')
  //       try {
  //         const response = await axios.get(
  //           `/biographies/player?username=${username}`
  //         )

  //         setData(response.data)
  //       } catch (error) {}
  //     } else if (profile && profile === 'Coach') {
  //       const { data, error } = await updateUserRoles()
  //       const find = data.find((o) => o.role === 'COACH')
  //       const username = getStr(find, 'username')

  //       try {
  //         const response = await axios.get(
  //           `/biographies/coach?username=${username}`
  //         )
  //         setDataCoach(response.data)
  //       } catch (error) {}
  //     }
  //   }

  //   getBio()
  // }, [])

  return (
    <div>
      <InfoPlayerWithCircleImage dataBio={data?.data} feedPost />
    </div>
  )
}
