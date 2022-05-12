import { isEmpty, map } from 'lodash'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import {
  player_of_the_weeks,
  shared_biographies,
} from 'src/components/card-feeds/constants'
import { settings } from 'src/constants/constants'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { getDiaryById } from 'src/service/feed/yours.service'
import { ItemInjuries } from './item-injuries'
import { ItemLineChart } from './item-line-chart'
import { ItemTraining } from './item-training'
import {
  SvgClock,
  SvgComment,
  SvgFavorite,
  SvgSave,
  SvgShare,
} from 'src/imports/svgs'
import { formatDistanceToNowStrict } from 'date-fns'
import { Text } from 'src/components/Text'
import dayjs from 'dayjs'
import { safeHttpImage } from 'src/utils/utils'
import { InjuryChart } from 'src/modules/dashboard/pain/component/injury-chart'
import { ListComment } from './list-comment'

interface ModalDiaryTrainingType {
  card: CardFeedType
}

export const ModalDiaryTraining = ({ card }: ModalDiaryTrainingType) => {
  const { isLoading, data } = useQuery(
    [QUERIES_FEED.FEED_GET_DIARY_BY_ID, card?.postId],
    () => getDiaryById(card?.postId),
    {
      onSuccess: (res) => {},
    }
  )
  // console.log('card', card)

  return (
    <div className="grid grid-cols-2 mt-[16px] mb-[16px]">
      <div className="col-span-1">
        <div className="flex px-5 items-center mb-5 relative">
          {card?.userInfo?.faceImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card?.userInfo?.faceImage as string}
              alt=""
              className="w-[48px] h-[48px] object-cover mr-[12px] rounded-full"
            ></img>
          )}

          {card?.typeOfPost === player_of_the_weeks &&
            card?.bioInfo?.faceImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card?.bioInfo?.faceImageUrl as string}
                alt=""
                className="w-[48px] h-[48px] object-cover mr-[12px] rounded-full"
              ></img>
            )}

          <div className=" ">
            {card?.typeOfPost === player_of_the_weeks ? (
              <Text name="body1" className="text-white ">
                {`#${
                  card?.bioInfo?.firstName + ' ' + card?.bioInfo?.lastName || ''
                }`}
              </Text>
            ) : (
              <Text name="body1" className="text-white ">
                {`#${
                  card?.userInfo?.firstName + ' ' + card?.userInfo?.lastName ||
                  ''
                }`}
              </Text>
            )}
            <div className="text-Grey ">
              <SvgClock />
              {card?.createdAt && card?.typeOfPost !== player_of_the_weeks && (
                <Text name="Caption" className=" inline-block ">
                  {`${formatDistanceToNowStrict(card?.createdAt as number)} ${
                    card?.userInfo?.city ? '-' : ''
                  } ${card?.userInfo?.birthCountry?.alpha2Code}/${
                    card?.userInfo?.city || ''
                  } /${dayjs(card?.createdAt).format('YYYY')}`}
                </Text>
              )}

              {card?.typeOfPost === shared_biographies && (
                <Text name="Caption" className=" inline-block ">
                  {`${formatDistanceToNowStrict(
                    card?.userInfo?.createdAt as number
                  )} ${card?.userInfo?.city ? '-' : ''} ${
                    card?.userInfo?.birthCountry?.alpha2Code
                  }/${card?.userInfo?.city || ''} /${dayjs(
                    card?.userInfo?.createdAt
                  ).format('YYYY')}`}
                </Text>
              )}
              {card?.typeOfPost === player_of_the_weeks && (
                <Text name="Caption" className=" inline-block ">
                  {formatDistanceToNowStrict(card?.createdAt as number)}
                </Text>
              )}
            </div>
          </div>
        </div>

        <Slider {...settings} className={`h-[255px] ml-[20px]`}>
          <div className="h-[225px]">
            <ItemTraining card={card && card} />
          </div>

          {!isEmpty(data?.data?.eatChart) ||
          !isEmpty(data?.data?.energyChart) ||
          !isEmpty(data?.data?.sleepChart) ? (
            <div className="h-[225px]">
              <ItemLineChart
                card={data?.data && data?.data}
                loading={isLoading}
              />
            </div>
          ) : null}

          {!isEmpty(data?.data?.injuries) ? (
            <div className="h-[225px]">
              <ItemInjuries card={data?.data} />
            </div>
          ) : null}
        </Slider>

        {!isEmpty(card?.training?.trainingMedia) && (
          <Slider {...settings} className="h-[255px] ml-[20px]">
            {card?.training?.trainingMedia.map((item) => (
              <img
                src={safeHttpImage(item?.image)}
                className="object-cover"
              ></img>
            ))}
          </Slider>
        )}
        <div className="w-full flex text-[14px] p-[20px]">
          <div className="flex-1">
            <p>Energy</p>
            <p className="text-[#E85CFF]">{data?.data?.energyLevel}</p>
          </div>
          <div className="flex-1">
            <p>Sleep</p>
            <p className="text-[#09E099]">{data?.data?.energyLevel}</p>
          </div>
          <div className="flex-1">
            <p>Eat</p>
            <p className="text-[#07E1FF]">{data?.data?.energyLevel}</p>
          </div>
          <div className="flex-1">
            <p>Pain</p>
            <p className="text-[#4654EA]">{data?.data?.energyLevel}</p>
          </div>
        </div>

        <div className="w-full h-[320px] relative">
          <div className="scale-50 absolute -left-[112px] -top-[176px]">
            <InjuryChart />
          </div>
        </div>

        <div className="flex px-5 mt-[4px]">
          <div className="flex-1 float-left ">
            <div className="flex float-left">
              <div
                className="hover:scale-110 duration-150"
                // onClick={() =>
                //   handleClickFavorite(
                //     card?.postId as string,
                //     card?.typeOfPost as string
                //   )
                // }
              >
                <SvgFavorite active={card?.isLiked} />
              </div>
              <Text name="Body2" className="text-Grey ">
                {card?.userInfo?.age as number}
              </Text>
            </div>

            <div className="flex ml-[64px]">
              <Text name="Body2" className="text-Grey mr-1 ">
                {card?.userInfo?.age as number}
              </Text>
              <SvgComment />
            </div>
          </div>

          <div className="flex-row-reverse hover:scale-110 duration-150 pr-[16px]">
            <SvgShare />
          </div>
          <div
            className="flex-row-reverse hover:scale-110 duration-150 mt-[2px] cursor-pointer"
            // onClick={handleSave}
          >
            <SvgSave fill={`${card?.isSaved ? '#09E099' : ''}`} />
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <ListComment postId={card?.postId} typeOfPost={card?.typeOfPost} />
      </div>
    </div>
  )
}
