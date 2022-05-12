import {
  SvgClock,
  SvgComment,
  SvgFavorite,
  SvgSave,
  SvgShare,
} from 'src/imports/svgs'
import { Text } from '../Text'
const cls = require('./card-yours.module.css')
import { ReactElement, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import {
  likePost,
  savePost,
  subscribeProvider,
} from 'src/service/feed/news.service'
import { CardFeedType } from 'src/constants/types/feed/yours'
import { CardPlainPost } from './component/plain-post'
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
} from './constants'
import { ListFriend } from './component/list-friend'
import { CardDiaryTraining } from './component/diary-training'
import { SharedBiography } from './component/shared-biography'
import dayjs from 'dayjs'
import { CardDiaryMatch } from './component/diary-match'
import { RemainDiaryUpdate } from './component/remain-diary-update'
import { ClubTransferHistories } from './component/club-transfer-histories'
import { SharedLeaderBoard } from './component/shared-leaderboard'
import { PersonalGoals } from './component/personal_goals'
import { PlayerOfTheWeek } from './component/player-of-the-week'
import { OptionFeed } from './component/option-feed'

interface CardYourType {
  card?: CardFeedType
}

export const CardFeed = ({ card }: CardYourType) => {
  const queryClient = useQueryClient()
  const [play, setPlay] = useState<boolean>(false)
  const [openOption, setOpenOption] = useState<boolean>(false)

  const { isLoading: loadingSubscribe, mutate: subScribe } = useMutation(
    [QUERIES_FEED.FEED_SUBSCRIBE_PROVIDER],
    subscribeProvider,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_PROVIDER)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_YOURS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_FRIENDS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_ALL)
        setOpenOption(false)
      },
    }
  )

  const { mutate: like } = useMutation(
    [QUERIES_FEED.FEED_LIKE_POST],
    likePost,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_OF_PROVIDER)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_YOURS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_FRIENDS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_ALL)
      },
    }
  )

  //save post
  const { mutate: save } = useMutation(
    [QUERIES_FEED.FEED_SAVE_POST],
    savePost,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_YOURS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_FRIENDS)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_ALL)
      },
    }
  )

  const handleSave = () => {
    if (!card?.isSaved) {
      save({ postId: card?.postId, typeOfPost: card?.typeOfPost })
    } else if (card?.isSaved) {
      save({ postId: card?.postId, typeOfPost: card?.typeOfPost })
    }
  }

  const handleClickFavorite = async (postId: string, typeOfPost: string) => {
    if (!card?.isLiked) {
      like({ postId: postId, typeOfPost: typeOfPost, query: 'like' })
    } else if (card?.isLiked) {
      like({ postId: postId, typeOfPost: typeOfPost, query: 'unlike' })
    }
  }

  const handlePlayVideo = () => {
    setPlay(!play)
  }

  const handleOption = () => {
    if (!openOption) {
      setOpenOption(true)
    } else {
      setOpenOption(false)
    }
  }

  // const handleUnfollow = () => {
  //   setOpenModalUnfollow(true)
  // }

  // const handleConfirmUnfollow = () => {
  //   if (!card?.providerId) {
  //     toast.error('provider id not found')
  //     setOpenModalUnfollow(false)
  //     return
  //   }
  //   subScribe(card?.providerId)
  // }

  const handleTypeOfPost = (
    typeOfPost: string,
    typeOfDiary: string
  ): ReactElement => {
    switch (typeOfPost) {
      case diaries: {
        if (typeOfDiary && typeOfDiary === TRAINING) {
          return <CardDiaryTraining card={card} />
        } else {
          return <CardDiaryMatch card={card} />
        }
      }

      case plain_posts: {
        return <CardPlainPost mediaLinks={card?.mediaLinks} />
      }

      case shared_biographies: {
        return <SharedBiography card={card} />
      }

      case remind_update_diaries: {
        return <RemainDiaryUpdate card={card} />
      }

      case club_transfer_histories: {
        return <ClubTransferHistories card={card} />
      }

      case shared_leaderboard: {
        return <SharedLeaderBoard card={card} />
      }

      case personal_goals: {
        return <PersonalGoals card={card} />
      }

      case player_of_the_weeks: {
        return <PlayerOfTheWeek card={card} />
      }
    }

    return null
  }

  return (
    <div
      style={{
        padding: '24px 0px 24px',
        backdropFilter: 'blur(68px)',
        width: 'calc(100% - 32px)',
      }}
      className="rounded-[8px] bg-[#202128cc] max-w-[500px] relative border border-green-600 "
    >
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
                card?.userInfo?.firstName + ' ' + card?.userInfo?.lastName || ''
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

        <div className="spacer flex-grow "></div>
        {console.log('card', card)}
        <OptionFeed
          userId={card?.userId}
          type={card?.typeOfPost}
          // link={card?}
          reportUserName={card?.userInfo?.username}
        />
      </div>

      {handleTypeOfPost(card?.typeOfPost, card?.typeOfDiary || '')}

      <p
        className={`${cls.lineClamp} ${
          card?.typeOfDiary === plain_posts ? 'mb-[25px] ' : ''
        } text-white px-5 mt-[20px]`}
        dangerouslySetInnerHTML={{ __html: card?.text as string }}
      ></p>

      {card?.typeOfPost &&
        card?.typeOfPost === plain_posts &&
        card?.friendTags.length > 0 && (
          <div className="w-full pl-[20px] pr-[20px] h-[100px]">
            <p>Friends tag:</p>
            <ListFriend listFriend={card?.friendTags} />
          </div>
        )}

      <div className="flex px-5 mt-[4px]">
        <div className="flex-1 float-left ">
          <div className="flex float-left">
            <div
              className="hover:scale-110 duration-150"
              onClick={() =>
                handleClickFavorite(
                  card?.postId as string,
                  card?.typeOfPost as string
                )
              }
            >
              <SvgFavorite active={card?.isLiked} />
            </div>
            {/* <Text name="Body2" className="text-Grey ">
              {card?.userInfo?.age as number}
            </Text> */}
          </div>

          <div className="flex ml-[32px]">
            {/* <Text name="Body2" className="text-Grey mr-1 ">
              {card?.userInfo?.age as number}
            </Text> */}
            <SvgComment />
          </div>
        </div>

        <div className="flex-row-reverse hover:scale-110 duration-150 pr-[16px]">
          <SvgShare />
        </div>
        <div
          className="flex-row-reverse hover:scale-110 duration-150 mt-[2px] cursor-pointer"
          onClick={handleSave}
        >
          <SvgSave fill={`${card?.isSaved ? '#09E099' : ''}`} />
        </div>
      </div>
    </div>
  )
}
