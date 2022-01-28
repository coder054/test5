import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { Carousel } from 'antd'
// import 'antd/dist/antd.css'
import { itemLanding } from 'constants/landing-page'
import { itemLandingType } from 'constants/types'
import Image from 'next/image'
import cls from './landing.module.css'
import { imgAppStore, imgGooglePlay } from 'imports/images'
import { Button } from 'components'
import Link from 'next/link'

const contentStyle: any = {
  height: '720px',
  color: '#fff',
  textAlign: 'center',
  background: '#000000',
}

const Landing = () => {
  const CarouselProps = {
    Infinity: true,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    dotClass: cls.dot,
    swipeToSlide: true,
    draggable: true,
  }

  return (
    <LayoutLanding>
      <Carousel
        className={`h-[720px] bg-slate-200 mt-[170px] ${cls.carouse}`}
        {...CarouselProps}
      >
        {itemLanding.map((item: itemLandingType) => (
          <div key={item.idItem} className="h-[720px] ">
            <div style={contentStyle} className="flex w-full">
              <div className={` ${cls.content} flex-1 right-0`}>
                <div className="float-right pr-6 w-[592px]">
                  <span
                    className={`text-[48px] leading-[66px] font-bold pl-[24px] pr-[24px]  ${cls.title}`}
                  >
                    {item.title}
                  </span>
                  <span className="text-[24px] leading-[33px] float-right pt-[24px]">
                    {item.content}
                  </span>

                  <div className="pt-[64px] flex w-full">
                    <div className="flex m-auto justify-around w-[488px]">
                      <Link href="/signin">
                        <a className="">
                          <Button
                            className="w-[224px] h-[48px] bg-[#4654EA] text-[15px]"
                            text="Sign In"
                          />
                        </a>
                      </Link>

                      <Link href="/signup">
                        <a className="">
                          <Button
                            className="w-[224px] h-[48px] bg-[#000000] text-[15px] border border-[#09E099] text-[#09E099]"
                            text="Sign up"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${cls.image} flex-1`}>
                <div className="float-left relative">
                  <Image src={item.image} alt="" className="" />
                  <div className="flex w-[336px] m-auto">
                    <Link href={'https://webapp.diawi.com/install/QczCSL'}>
                      <a className="flex-1 cursor-pointer" target={'_blank'}>
                        <Image src={imgGooglePlay} alt="" />
                      </a>
                    </Link>
                    <Link href={'https://webapp.diawi.com/install/99bGwJ'}>
                      <a className="flex-1 cursor-pointer" target={'_blank'}>
                        <Image src={imgAppStore} alt="" />
                      </a>
                    </Link>
                  </div>
                  <div className="absolute w-[21px] h-[21px] bg-[#FFFFFF] rounded-full top-[117px] left-[129px]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#09E099] rounded-full top-[471px] left-[85px]"></div>
                  <div className="absolute w-[62px] h-[62px] bg-[#FF9607] rounded-full top-[181px] left-[538px]"></div>
                  <div className="absolute w-[32px] h-[32px] bg-[#4654EA] rounded-full top-[382px] left-[485px]"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </LayoutLanding>
  )
}

export default Landing
