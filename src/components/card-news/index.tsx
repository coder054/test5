import { Carousel, notification } from 'antd'
import { NewsType } from 'src/constants/types'
import {
  SvgClock,
  SvgComment,
  SvgEuro,
  SvgFavorite,
  SvgShare,
} from 'src/imports/svgs'
import { Text } from '../Text'
const cls = require('./card-news.module.css')
import ReactPlayer from 'react-player'
import { useState } from 'react'
import Link from 'next/link'
import {
  format,
  formatDistance,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRelative,
  subDays,
} from 'date-fns'

interface CardNewsType {
  card?: NewsType
  handleFavorite?: (postId: string, typeOfPost: string, status: string) => void
}

const contentStyle: any = {
  height: '195px',
  color: '#fff',
  textAlign: 'center',
  background: '#000000',
}

export const CardNews = ({ card, handleFavorite }: CardNewsType) => {
  const [play, setPlay] = useState<boolean>(false)

  const CarouselProps = {
    Infinity: true,
    dots: true,
    dotClass: cls.dot,
    swipeToSlide: true,
    draggable: true,
  }

  const handleClickFavorite = async (postId: string, typeOfPost: string) => {
    handleFavorite &&
      handleFavorite(postId, typeOfPost, card?.isLiked ? 'unlike' : 'like')
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
      className="rounded-[8px] bg-[#202128cc] w-[310px] md:w-[347px] relative"
    >
      <div className=" flex px-5 items-center mb-5 ">
        {card?.providerInfo?.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card?.providerInfo?.logo as string}
            alt=""
            className="w-[48px] h-[48px] object-cover mr-[12px]"
          ></img>
        )}

        <div className=" ">
          <Text name="body1" className="text-white ">
            {`#${card?.providerInfo?.name as string}`}
          </Text>
          <div className=" ">
            <SvgClock />
            {card?.createdAt && (
              <Text name="Caption" className="text-Grey inline-block ">
                {`${formatDistanceToNowStrict(card?.createdAt as number)} ${
                  card?.providerInfo?.region ? '-' : ''
                } ${card?.providerInfo?.region || ''}`}
              </Text>
            )}
          </div>
        </div>

        <div className="spacer flex-grow "></div>

        <svg
          className="cursor-pointer"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
            fill="white"
          />
        </svg>
      </div>

      <Carousel
        className={`h-[195px] bg-slate-200 ${cls.carouse}`}
        {...CarouselProps}
      >
        {card?.mediaLinks &&
          card?.mediaLinks.map((item, index) => (
            <div key={index} className="h-[195px]">
              <div style={contentStyle} className="flex w-full">
                <div className={`${cls.image} flex-1`}>
                  {item.type === 'IMAGE' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt="" className="" />
                  ) : null}
                  {item.type === 'VIDEO' ? (
                    <div
                      className={`${
                        play ? '' : 'opacity-70'
                      } w-[347px] h-[195px] object-fill cursor-pointer flex justify-between items-center relative`}
                      onClick={handlePlayVideo}
                    >
                      <ReactPlayer url={item.url} controls />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
      </Carousel>
      <Link href={card?.link as string}>
        <a target={'_blank'}>
          <p
            className={`${cls.lineClamp} text-white mb-[25px] px-5 mt-[20px]`}
            dangerouslySetInnerHTML={{ __html: card?.excerptText as string }}
          ></p>
        </a>
      </Link>

      <div className="flex px-5 ">
        <div
          className="hover:scale-125 duration-150"
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

        <div className="spacer flex-grow "></div>
        <div
          className="hover:scale-125 duration-150"
          onClick={() => {
            navigator.clipboard.writeText(card?.link as string)
            notification.open({
              message: '',
              description: 'Copy successfully.',
              style: {
                backgroundColor: '#09E099',
                color: '#FFFFFF',
              },
              duration: 3,
            })
          }}
        >
          <SvgShare />
        </div>

        <div className="spacer flex-grow "></div>
        <Text name="Body2" className="text-Grey mr-1 ">
          {card?.countComments as number}
        </Text>
        <div className="hover:scale-125 duration-150">
          <SvgComment />
        </div>
      </div>
    </div>
  )
}
