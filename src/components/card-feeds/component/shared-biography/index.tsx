import { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Loading } from 'src/components/MyLoading'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { InfoCoachWithCircleImage } from 'src/modules/biography/InfoCoachWithCircleImage'
import { InfoPlayerWithCircleImage } from 'src/modules/biography/InfoPlayerWithCircleImage'
import {
  getBioGraphyCoach,
  getBioGraphyPlayer,
} from 'src/service/feed/yours.service'
import { safeHttpImage } from 'src/utils/utils'

interface SharedBiographyProps {
  card?: CardFeedType
  isModal?: boolean
}

interface SharedBiographyPlayerProps {
  username: string
  countryFlagUrl: string
}

interface SharedBiographyCoachProps {
  username: string
  countryFlagUrl: string
}

export const SharedBiography = ({ isModal, card }: SharedBiographyProps) => {
  return (
    <div>
      {isModal && isModal ? (
        <Fragment>
          {card?.bioInfo?.userRole === 'PLAYER' ? (
            <Fragment>
              <SharedBiographyPlayer
                username={card?.userInfo?.username}
                countryFlagUrl={card?.bioInfo?.countryFlagUrl}
              />
            </Fragment>
          ) : (
            <Fragment>
              <SharedBiographyCoach
                username={card?.userInfo?.username}
                countryFlagUrl={card?.bioInfo?.countryFlagUrl}
              />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <div className="mx-auto w-[190px] text-center">
          <p className="text-[18px] font-semibold">Check my updated Bio</p>
          <img
            src={safeHttpImage(card?.bioInfo?.faceImageUrl)}
            className="w-[160px] h-[160px] object-cover rounded-full opacity-75 mx-auto mt-[24px] mb-[24px]"
          ></img>
        </div>
      )}
    </div>
  )
}

export const SharedBiographyPlayer = ({
  username,
  countryFlagUrl,
}: SharedBiographyPlayerProps) => {
  const { isLoading: loadingPlayer, data: dataPlayer } = useQuery(
    [QUERIES_FEED.FEED_SHARED_BIOGRAPHY_PLAYER_POST],
    () => getBioGraphyPlayer(username),
    {
      onSuccess: (res) => {},
    }
  )
  return (
    <Loading isLoading={loadingPlayer}>
      <InfoPlayerWithCircleImage
        dataBio={dataPlayer?.data}
        feedPost
        countryFlagUrl={countryFlagUrl}
      />
    </Loading>
  )
}

export const SharedBiographyCoach = ({
  username,
  countryFlagUrl,
}: SharedBiographyCoachProps) => {
  const { isLoading: loadingCoach, data: dataCoach } = useQuery(
    [QUERIES_FEED.FEED_SHARED_BIOGRAPHY_COACH_POST],
    () => getBioGraphyCoach(username),
    {
      onSuccess: (res) => {},
    }
  )
  return (
    <Loading isLoading={loadingCoach}>
      <InfoCoachWithCircleImage
        dataBio={dataCoach?.data}
        feedPost
        countryFlagUrl={countryFlagUrl}
      />
    </Loading>
  )
}
