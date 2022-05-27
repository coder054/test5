import { isEmpty } from 'lodash'
import { useQuery } from 'react-query'
import Slider from 'react-slick'
import {
  club_transfer_histories,
  diaries,
  personal_goals,
  plain_posts,
  player_of_the_weeks,
  remind_update_diaries,
  shared_biographies,
  shared_leaderboard,
  TRAINING,
} from 'src/components/card-feeds/constants'
import { settings } from 'src/constants/constants'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { getDiaryById } from 'src/service/feed/yours.service'
import { ItemInjuries } from './item-injuries'
import { ItemLineChart } from './item-line-chart'
import { ItemTraining } from './item-training'
import { SvgClock } from 'src/imports/svgs'
import { formatDistanceToNowStrict } from 'date-fns'
import { Text } from 'src/components/Text'
import dayjs from 'dayjs'
import { safeHttpImage } from 'src/utils/utils'
import { InjuryChart } from 'src/modules/dashboard/pain/component/injury-chart'
import { ListComment } from './comment/list-comment'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components/MyLoading'
import { Divider } from '@mui/material'
import { WriteComment } from 'src/components/write-comment'
import { handleStringFirstUppperCase } from 'src/utils/common.utils'
import { CardDiaryMatch } from '../../diary-match'
import { CardPlainPost } from '../../plain-post'
import { SharedBiography } from '../../shared-biography'
import { RemainDiaryUpdate } from '../../remain-diary-update'
import { ClubTransferHistories } from '../../club-transfer-histories'
import { SharedLeaderBoard } from '../../shared-leaderboard'
import { PersonalGoals } from '../../personal_goals'
import { PlayerOfTheWeek } from '../../player-of-the-week'
import { BottomCardFeed } from '../../bottom-card-feed'
import { Fragment } from 'react'
import { ListFriend } from '../../list-friend'

interface ModalDiaryTrainingType {
  card: CardFeedType
  focusComment?: boolean
}

export const ModalDiaryTraining = ({
  card,
  focusComment,
}: ModalDiaryTrainingType) => {
  const { isLoading, data } = useQuery(
    [QUERIES_FEED.FEED_GET_DIARY_BY_ID, card?.postId],
    () => getDiaryById(card?.postId),
    {
      onSuccess: (res) => {},
      enabled: card?.typeOfPost === diaries,
    }
  )

  return (
    <div className="grid grid-cols-2 mt-[16px] mb-[16px]">
      <div className="col-span-1">
        <div className="flex px-5 items-center mb-5 relative">
          {card?.userInfo?.faceImage && (
            <img
              src={safeHttpImage(card?.userInfo?.faceImage as string)}
              alt=""
              className="w-[48px] h-[48px] object-cover mr-[12px] rounded-full"
            ></img>
          )}

          {card?.typeOfPost === player_of_the_weeks &&
            card?.bioInfo?.faceImageUrl && (
              <img
                src={safeHttpImage(card?.bioInfo?.faceImageUrl as string)}
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

              {card?.typeOfPost === player_of_the_weeks && (
                <Text name="Caption" className=" inline-block ">
                  {formatDistanceToNowStrict(card?.createdAt as number)}
                </Text>
              )}
            </div>
          </div>
        </div>
        {card?.typeOfPost === diaries && (
          <Slider {...settings} className={`h-[255px] ml-[20px]`}>
            <Loading isLoading={isLoading} className="h-[225px]">
              {card?.typeOfDiary === TRAINING ? (
                <ItemTraining card={card && card} />
              ) : (
                <CardDiaryMatch card={card} />
              )}
            </Loading>

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
        )}

        {card?.typeOfPost === plain_posts && (
          <CardPlainPost mediaLinks={card?.mediaLinks} />
        )}

        {card?.typeOfPost === shared_biographies && (
          <SharedBiography card={card} isModal={true} />
        )}

        {card?.typeOfPost === remind_update_diaries && (
          <RemainDiaryUpdate card={card} />
        )}

        {card?.typeOfPost === club_transfer_histories && (
          <ClubTransferHistories card={card} />
        )}

        {card?.typeOfPost === shared_leaderboard && (
          <SharedLeaderBoard card={card} />
        )}

        {card?.typeOfPost === personal_goals && <PersonalGoals card={card} />}

        {card?.typeOfPost === player_of_the_weeks && (
          <PlayerOfTheWeek card={card} isModal={true} />
        )}

        {!isEmpty(card?.training?.trainingMedia) && (
          <>
            <Divider
              style={{
                backgroundColor: '##484A4D',
                marginTop: '8px',
                marginBottom: '16px',
              }}
            />
            <Slider {...settings} className="h-[265px] ml-[20px]">
              {card?.training?.trainingMedia.map((item) => (
                <Fragment>
                  {item?.type === 'IMAGE' ? (
                    <img
                      src={safeHttpImage(item?.url)}
                      className="object-cover h-[225px] w-full"
                    ></img>
                  ) : (
                    <video
                      src={safeHttpImage(item?.url)}
                      className="object-cover"
                    ></video>
                  )}
                </Fragment>
              ))}
            </Slider>
          </>
        )}

        {card?.typeOfPost === plain_posts && (
          <p className="pl-[20px] text-[18px]">{card?.headline}</p>
        )}

        <p
          className={`${
            card?.typeOfPost === plain_posts ? 'mb-[8px] ' : ''
          } text-white px-5 mt-[8px]`}
          dangerouslySetInnerHTML={{ __html: card?.text as string }}
        ></p>

        {card?.typeOfPost === plain_posts && (
          <p className="pl-[20px] text-[14px] mb-[12px]">{card?.location}</p>
        )}

        {card?.typeOfPost &&
          card?.typeOfPost === plain_posts &&
          card?.friendTags.length > 0 && (
            <div className="w-full pl-[20px] pr-[20px] h-[100px] pointer-events-none mb-[18px]">
              <p>Friends tag:</p>
              <ListFriend listFriend={card?.friendTags} />
            </div>
          )}

        {card?.typeOfPost === diaries && (
          <>
            <Divider
              style={{
                backgroundColor: '##484A4D',
                marginTop: '8px',
                marginBottom: '8px',
              }}
            />
            <div className="w-full flex text-[14px] p-[20px]">
              <div className="flex-1">
                <p>Energy</p>
                <p className="text-[#E85CFF]">
                  {handleStringFirstUppperCase(data?.data?.energyLevel)}
                </p>
              </div>
              <div className="flex-1">
                <p>Sleep</p>
                <p className="text-[#09E099]">
                  {handleStringFirstUppperCase(data?.data?.sleep)}
                </p>
              </div>
              <div className="flex-1">
                <p>Eat</p>
                <p className="text-[#07E1FF]">
                  {handleStringFirstUppperCase(data?.data?.eatAndDrink)}
                </p>
              </div>
              <div className="flex-1">
                <p>Pain</p>
                <p className="text-[#4654EA]">
                  {handleStringFirstUppperCase(data?.data?.injuryPain)}
                </p>
              </div>
            </div>

            <div className="w-full h-[320px] relative">
              <div className="scale-50 absolute -left-[112px] -top-[176px]">
                <InjuryChart
                  lastDateRange="30"
                  postId={card?.postId}
                  isPost={true}
                  data={data && data.data}
                  loadingPost={isLoading}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1">
        <SimpleBar
          style={{
            maxHeight: 660,
          }}
        >
          <ListComment postId={card?.postId} typeOfPost={card?.typeOfPost} />
        </SimpleBar>
      </div>

      {/* bottom */}
      <div className="col-span-2 flex justify-center items-center">
        <div className="flex-1">
          <BottomCardFeed
            typeOfPost={card?.typeOfPost}
            countLike={
              card?.typeOfPost === plain_posts
                ? card?.countLikes
                : card?.bioInfo?.countLikes
            }
            countComment={
              card?.typeOfPost === plain_posts
                ? card?.countComments
                : card?.bioInfo?.countComments
            }
            isLiked={card?.isLiked}
            isSaved={card?.isSaved}
            postId={card?.postId}
          />
        </div>

        <div className="flex-1">
          <div className="pl-[32px]">
            <WriteComment
              postId={card?.postId}
              typeOfPost={card?.typeOfPost}
              focusComment={focusComment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
