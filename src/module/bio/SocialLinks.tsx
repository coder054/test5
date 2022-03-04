import { useEffect } from 'react'
import Link from 'next/link'

export const SocialLinks = ({ socialLinks }) => {
  useEffect(() => {
    // console.log('aaa socialLinks: ', socialLinks)
  }, [socialLinks])
  return (
    <div
      style={{
        background: 'rgba(32, 33, 40, 0.3)',
        backdropFilter: 'blur(68px)',
      }}
      className=" rounded-[8px] p-[20px]  text-center"
    >
      <div className="inline-grid grid-cols-7 mx-auto gap-x-[16px] ">
        <Link href={socialLinks?.instagram || 'https://www.instagram.com/'}>
          <a className="">
            <img
              src={'/biography/social-icons/Instagram.png'}
              className="w-[40px] h-[40px]"
              alt=""
            />
          </a>
        </Link>

        <Link href={socialLinks?.facebook || 'https://www.facebook.com/'}>
          <a className="">
            <img
              src={'/biography/social-icons/facebook.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link>

        <Link href={socialLinks?.twitter || 'https://twitter.com/'}>
          <a className="">
            <img
              src={'/biography/social-icons/twitter.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link>

        {/* <Link href={socialLinks?.twitter || 'https://twitter.com/'}>
          <a className="">
            <img
              src={'/biography/social-icons/telegram.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link> */}

        <Link href={socialLinks?.youtube || 'https://www.youtube.com/'}>
          <a className="">
            <img
              src={'/biography//social-icons/youtube.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link>

        <Link href={socialLinks?.veoHighlites || 'https://app.veo.co/'}>
          <a className="">
            <img
              src={'/biography/social-icons/veo.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link>

        <Link href={socialLinks?.tiktok || 'https://www.tiktok.com/'}>
          <a className="">
            <img
              src={'/biography/social-icons/node.png'}
              className="w-[40px] h-[40px] "
              alt=""
            />
          </a>
        </Link>
      </div>
    </div>
  )
}
