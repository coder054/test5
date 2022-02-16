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
    autoplaySpeed: 200000,
    dots: true,
    dotClass: cls.dot,
    swipeToSlide: true,
    draggable: true,
  }

  return (
    <LayoutLanding>
      <Carousel
        className={`min-h-[735px] lg:min-h-[720px] bg-slate-200 lg:mt-[70px] ${cls.carouse}`}
        {...CarouselProps}
      >
        {itemLanding.map((item: itemLandingType) => (
          <div key={item.idItem} className="min-h-[720px]">
            <div
              style={contentStyle}
              className="float-left lg:flex w-full h-full"
            >
              <div
                className={` ${cls.content} lg:flex-1 lg:right-0 mt-[62px] lg:mt-[81px] h-full`}
              >
                <div className="lg:float-right pr-2 lg:pr-6 w-full lg:w-[592px]">
                  <span
                    className={`text-[24px] md:text-[32px] lg:text-[48px] leading-[36px] lg:leading-[66px] font-bold pl-[12px] lg:pl-[24px] pr-[12px] lg:pr-[24px]  ${cls.title}`}
                  >
                    {item.title}
                  </span>
                  <span className="text-[12px] md:text-[18px] lg:text-[24px] leading-[20px] lg:leading-[33px] float-right pt-[6px] md:pt-[12px] lg:pt-[24px] pl-[8px] lg:pl-[0px] pr-[8px] lg:pr-[0px]">
                    {item.content}
                  </span>

                  <div className="pt-[24px] lg:pt-[64px] flex w-full">
                    <div className="flex m-auto justify-around w-[488px]">
                      <Link href="/signin">
                        <a className="">
                          <Button
                            className="w-[172px] md:w-[224px] h-[48px] bg-[#4654EA] text-[15px]"
                            text="Sign In"
                          />
                        </a>
                      </Link>

                      <Link href="/signup">
                        <a className="">
                          <Button
                            className="w-[172px] md:w-[224px] h-[48px] bg-[#000000] text-[15px] border border-[#09E099] text-[#09E099]"
                            text="Sign up"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${cls.image} lg:flex-1 pt-[56px] lg:pt-[0px] h-[580px] lg:h-[780px]`}
              >
                <div className="float-left relative">
                  <Image src={item.image} alt="" />
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
                  <div className="absolute w-[21px] h-[21px] bg-[#FFFFFF] rounded-full top-[82px] lg:top-[117px] left-[25px] lg:left-[66px]"></div>
                  <div className="absolute w-[43px] h-[43px] bg-[#09E099] rounded-full top-[308px] lg:top-[471px] left-[-15px] lg:left-[-15px]"></div>
                  <div className="absolute w-[59px] h-[59px] bg-[#FF9607] rounded-full top-[122px] lg:top-[161px] left-[305px] lg:left-[368px]"></div>
                  <div className="absolute w-[32px] h-[32px] bg-[#4654EA] rounded-full top-[272px] lg:top-[422px] left-[254px] lg:left-[345px]"></div>
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
