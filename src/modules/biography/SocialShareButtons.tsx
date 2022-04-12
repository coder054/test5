import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'

export const SocialShare = ({ fullName }) => {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const fullUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/${router.asPath}`
  }, [router.asPath, show])

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 10)
  }, [])

  if (!fullUrl || !show) {
    return (
      <div
        style={{
          background: 'rgba(32, 33, 40, 0.3)',
          backdropFilter: 'blur(68px)',
        }}
        className=" rounded-[8px] p-[20px]  text-center h-[88px]"
      ></div>
    )
  }

  return (
    <div
      style={{
        background: 'rgba(32, 33, 40, 0.3)',
        backdropFilter: 'blur(68px)',
      }}
      className=" rounded-[8px] p-[20px]  text-center"
    >
      <div className="inline-grid grid-cols-7 mx-auto gap-x-[16px] ">
        <img
          src={'/biography/social-icons/Instagram.png'}
          className="w-[40px] h-[40px]"
          alt=""
        />

        <FacebookShareButton
          url={fullUrl}
          quote={`${fullName} on Zporter`}
          hashtag={'#zporter'}
          className=""
        >
          <img
            src={'/biography/social-icons/facebook.png'}
            className="w-[40px] h-[40px] "
            alt=""
          />
        </FacebookShareButton>

        <TwitterShareButton url={fullUrl} className="">
          <img
            src={'/biography/social-icons/twitter.png'}
            className="w-[40px] h-[40px] "
            alt=""
          />
        </TwitterShareButton>

        <TelegramShareButton url={fullUrl}>
          <img
            src={'/biography/social-icons/telegram.png'}
            className="w-[40px] h-[40px] "
            alt=""
          />
        </TelegramShareButton>

        {/* youtube */}
        <img
          src={'/biography//social-icons/youtube.png'}
          className="w-[40px] h-[40px] "
          alt=""
        />

        {/* veo */}
        <img
          src={'/biography/social-icons/veo.png'}
          className="w-[40px] h-[40px] "
          alt=""
        />
        {/* node music */}
        <img
          src={'/biography/social-icons/node.png'}
          className="w-[40px] h-[40px] "
          alt=""
        />
      </div>
    </div>
  )
}
