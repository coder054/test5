import {
  SvgClock,
  SvgComment,
  SvgCopyLink,
  SvgFavorite,
  SvgSave,
  SvgShare,
} from 'src/imports/svgs'
import { Text } from '../Text'
const cls = require('./card-yours.module.css')
import { ReactElement, useEffect, useState } from 'react'
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
  LIKE,
  personal_goals,
  plain_posts,
  player_of_the_weeks,
  remind_update_diaries,
  shared_biographies,
  shared_leaderboard,
  TRAINING,
  UN_LIKE,
  ztar_of_the_matches,
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
import { ModalMui } from '../ModalMui'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { XIcon } from '../icons'
import { ModalDiaryTraining } from './component/diary-training/item/modal-diary-training'
import { ModalShare } from '../modal-share'

interface CardYourType {
  card?: CardFeedType
}

export const CardFeed = ({ card }: CardYourType) => {
  const queryClient = useQueryClient()
  const [play, setPlay] = useState<boolean>(false)
  const [openOption, setOpenOption] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [focusComment, setFocusComment] = useState<boolean>(false)
  const [openModalShare, setOpenModalShare] = useState<boolean>(false)
  const [urlShare, setUrlShare] = useState<string>('')
  const [countLike, setCountLike] = useState<number>(0)
  const [isLike, setIsLike] = useState<boolean>(card?.isLiked)

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
        // toast.success(res.data)
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

  //handle like, unlike
  useEffect(() => {
    if (countLike === 10) {
      toast.error('Limit like comment in a minute.')
      setTimeout(() => {
        setCountLike(0)
      }, 60000)
    }
  }, [countLike])

  const handleClickFavorite = async (postId: string, typeOfPost: string) => {
    if (!isLike && countLike !== 10) {
      setIsLike(true)
      setCountLike(countLike + 1)
      try {
        like({ postId: postId, typeOfPost: typeOfPost, query: LIKE })
      } catch (error) {}
    } else if (isLike && countLike !== 10) {
      setIsLike(false)
      setCountLike(countLike + 1)
      try {
        like({ postId: postId, typeOfPost: typeOfPost, query: UN_LIKE })
      } catch (error) {}
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

  const handleClickComment = () => {
    if (!focusComment) {
      setFocusComment(true)
    }
    setOpenModal(true)
  }

  const handleShare = () => {
    setOpenModalShare(true)
    setUrlShare(
      `${window.location.origin}/posts/${card.postId}/${card?.typeOfPost}`
    )
  }

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
      case ztar_of_the_matches: {
        return <p className="pl-[32px]">ztar of the matches</p>
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
      className="rounded-[8px] bg-[#202128cc] max-w-[500px] relative"
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
            <Text name="body1" className="text-white">
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
                } /${dayjs(card?.userInfo?.birthDay).format('YYYY')}`}
              </Text>
            )}

            {card?.typeOfPost === player_of_the_weeks && (
              <Text name="Caption" className=" inline-block ">
                {formatDistanceToNowStrict(card?.createdAt as number)}
              </Text>
            )}
          </div>
        </div>

        <div className="spacer flex-grow"></div>
        <OptionFeed
          userId={card?.userId}
          type={card?.typeOfPost}
          card={card}
          reportUserName={card?.userInfo?.username}
          postId={card?.postId}
          typeOfPost={card?.typeOfPost}
        />
      </div>

      <div
        onClick={() => {
          setOpenModal(true)
        }}
        className="cursor-pointer"
      >
        {handleTypeOfPost(card?.typeOfPost, card?.typeOfDiary || '')}
      </div>

      {card?.typeOfPost === plain_posts && (
        <p className="pl-[20px] text-[18px]">{card?.headline}</p>
      )}

      <p
        className={`${cls.lineClamp} ${
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
          <div className="w-full pl-[20px] pr-[20px] h-[100px]  mb-[18px]">
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
              <SvgFavorite active={isLike} />
            </div>
          </div>

          <div className="flex ml-[32px]">
            <div
              onClick={handleClickComment}
              className="w-[20px] hover:scale-110 duration-150"
            >
              <SvgComment color={card?.countComments ? '#09E099' : null} />
            </div>
          </div>
        </div>

        <div
          className="flex-row-reverse hover:scale-110 duration-150 pr-[16px]"
          onClick={handleShare}
        >
          <SvgShare />
        </div>
        <div
          className="flex-row-reverse hover:scale-110 duration-150 mt-[2px] cursor-pointer"
          onClick={handleSave}
        >
          <SvgSave fill={`${card?.isSaved ? '#09E099' : ''}`} />
        </div>
      </div>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 950,
          overflow: 'auto',
        }}
        isOpen={openModal}
        onClose={setOpenModal}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="absolute z-50 right-2 -top-4"
            >
              <XIcon />
            </button>
            <ModalDiaryTraining card={card} focusComment={focusComment} />
          </div>
        </SimpleBar>
      </ModalMui>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 950,
          overflow: 'auto',
        }}
        isOpen={openModalShare}
        onClose={setOpenModalShare}
      >
        <div className="relative p-4">
          <button
            type="button"
            onClick={() => setOpenModalShare(false)}
            className="absolute z-50 right-4 top-4"
          >
            <XIcon />
          </button>
          <p className="text-[#ffffff] text-[18px] mb-[48px]">Share with</p>
          <ModalShare url={urlShare && urlShare} />
          <div className="w-full mt-[48px] mb-[12px]">
            <p>Page Link</p>
            <div className="w-full h-[52px] mt-[12px]">
              <input
                className="h-[52px] bg-[#444444] text-[#a09f9f] w-11/12 pl-[12px] float-left"
                disabled
                value={urlShare && urlShare}
              ></input>
              <div
                className="w-1/12 bg-[#444444] active:bg-[#3d3d3d] h-[52px] float-right flex 
                  justify-center items-center cursor-pointer"
                title="copy"
                onClick={() => {
                  navigator.clipboard.writeText(urlShare && urlShare)
                  toast.success('Copy successfully!')
                }}
              >
                <div className="scale-150">
                  <SvgCopyLink />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalMui>
    </div>
  )
}
