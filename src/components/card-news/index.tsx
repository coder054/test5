import Slider from 'react-slick'
import { SvgClock, SvgComment, SvgFavorite, SvgShare } from 'src/imports/svgs'
import { Text } from '../Text'
const cls = require('./card-news.module.css')
import ReactPlayer from 'react-player'
import { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { likePost } from 'src/service/feed/news.service'
import { safeHttpImage } from 'src/utils/utils'
import { isEmpty } from 'lodash'
import { OptionFeed } from '../card-feeds/component/option-feed'

interface CardNewsType {
  card?: any
  handleFavorite?: (postId: string, typeOfPost: string, status: string) => void
}

const contentStyle: any = {
  height: '195px',
  color: '#fff',
  textAlign: 'center',
  background: '#000000',
}

export const CardNews = ({ card, handleFavorite }: CardNewsType) => {
  const queryClient = useQueryClient()
  const [play, setPlay] = useState<boolean>(false)

  const CarouselProps = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  const { mutate: like } = useMutation(
    [QUERIES_FEED.FEED_LIKE_POST],
    likePost,
    {
      onSuccess: (res) => {
        toast.success(res.data)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST)
        queryClient.invalidateQueries(QUERIES_FEED.FEED_NEW_POST_OF_PROVIDER)
      },
    }
  )

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

  return (
    <div
      style={{
        padding: '24px 0px 32px',
        backdropFilter: 'blur(68px)',
      }}
      className="rounded-[8px] bg-[#202128cc] w-[310px] md:w-[500px] relative"
    >
      <div className="flex px-5 items-center mb-5 relative">
        {card?.providerInfo?.logo && (
          <img
            src={safeHttpImage(card?.providerInfo?.logo)}
            alt=""
            className="w-[48px] h-[48px] object-cover mr-[12px] rounded-full"
          ></img>
        )}

        <div className=" ">
          <Text name="body1" className="text-white ">
            {`#${(card?.providerInfo?.name as string) || ''}`}
          </Text>
          <div className="text-Grey ">
            <SvgClock />
            {card?.createdAt && (
              <Text name="Caption" className=" inline-block ">
                {`${formatDistanceToNowStrict(card?.createdAt as number)} ${
                  card?.providerInfo?.region ? '-' : ''
                } ${card?.providerInfo?.region || ''}`}
              </Text>
            )}
          </div>
        </div>

        <div className="spacer flex-grow"></div>
        <OptionFeed
          userId={card?.userId}
          type={card?.typeOfPost}
          providerId={card?.providerId}
          link={card?.link}
        />
      </div>

      <Slider
        className={`h-[195px] bg-slate-200 ${cls.carouse}`}
        {...CarouselProps}
      >
        {card?.mediaLinks &&
          card?.mediaLinks.map((item, index) => (
            <div key={index} className="h-[195px]">
              <div style={contentStyle} className="flex w-full">
                <div className={`${cls.image} flex-1`}>
                  {item.type === 'IMAGE' ? (
                    <img src={safeHttpImage(item?.url)} alt="" className="" />
                  ) : null}
                  {item.type === 'VIDEO' ? (
                    <div
                      className={`${
                        play ? '' : ''
                      } w-full h-[195px] object-cover cursor-pointer flex justify-between items-center relative`}
                      onClick={handlePlayVideo}
                    >
                      <ReactPlayer
                        url={item?.url}
                        controls
                        width={500}
                        height={195}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        {isEmpty(card?.mediaLinks) && (
          <p className={`${cls.lineClamp} text-[#ffffff] text-[22px] p-[20px]`}>
            {card?.headline}
          </p>
        )}
      </Slider>

      <p
        className={`${cls.lineClamp} text-white mb-[25px] px-5 mt-[20px]`}
        dangerouslySetInnerHTML={{ __html: card?.excerptText as string }}
      ></p>
      {console.log('card', card)}
      <div className="flex px-5">
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
            <Text name="Body2" className="text-Grey ">
              {card?.countLikes as number}
            </Text>
          </div>

          <div className="flex ml-[66px]">
            <Text name="Body2" className="text-Grey mr-1 ">
              {card?.countComments as number}
            </Text>
            <SvgComment />
          </div>
        </div>

        <div className="flex-row-reverse hover:scale-110 duration-150">
          <SvgShare />
        </div>
      </div>
    </div>
  )
}
