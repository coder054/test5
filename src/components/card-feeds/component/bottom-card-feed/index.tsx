import { SvgComment, SvgFavorite, SvgSave, SvgShare } from 'src/imports/svgs'
import { diaries, LIKE, UN_LIKE } from '../../constants'
import { Text } from 'src/components/Text'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import toast from 'react-hot-toast'
import { likePost } from 'src/service/feed/news.service'

interface BottomCardFeedProps {
  typeOfPost?: string
  postId?: string
  countLike?: number
  countComment?: number
  isLiked?: boolean
  isSaved?: boolean
}

export const BottomCardFeed = ({
  typeOfPost,
  isLiked,
  countLike,
  countComment,
  isSaved,
  postId,
}: BottomCardFeedProps) => {
  const [countLikes, setCountLike] = useState<number>(0)
  const [isLike, setIsLike] = useState<boolean>(isLiked)
  const queryClient = useQueryClient()

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

  useEffect(() => {
    if (countLike === 10) {
      toast.error('Limit like comment in a minute.')
      setTimeout(() => {
        setCountLike(0)
      }, 60000)
    }
  }, [countLike])

  const handleClickFavorite = async () => {
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

  return (
    <div
      className={`flex px-5 ${
        typeOfPost === diaries ? 'mt-[4px]' : 'mt-[32px]'
      }`}
    >
      <div className="flex-1 float-left">
        <div className="flex float-left">
          <div
            className="hover:scale-110 duration-150"
            onClick={handleClickFavorite}
          >
            <SvgFavorite active={isLike} />
          </div>
          {countLike && (
            <Text name="Body2" className="text-[#09E099] ">
              {countLike as number}
            </Text>
          )}
        </div>

        <div className="flex ml-[64px]">
          {countComment && (
            <Text name="Body2" className="text-[#09E099] mr-1 ">
              {countComment as number}
            </Text>
          )}
          <div className="hover:scale-110 duration-150">
            <SvgComment color={countComment ? '#09E099' : null} />
          </div>
        </div>
      </div>

      <div className="flex-row-reverse hover:scale-110 duration-150 pr-[16px]">
        <SvgShare />
      </div>
      <div
        className="flex-row-reverse hover:scale-110 duration-150 mt-[2px] cursor-pointer"
        // onClick={handleSave}
      >
        <SvgSave fill={`${isSaved ? '#09E099' : ''}`} />
      </div>
    </div>
  )
}
