import Image from 'next/image'
import { COMMENT_AVATAR_4 } from 'src/imports/images'

export const SectionFive = () => {
  return (
    <div className="laptopM:bg-landing-five mobileM:bg-landing-five-mb h-[560px] tabletM:h-[450px] bg-cover laptopM:bg-center mobileM:bg-right">
      <div className="laptopM:w-[1320px] mx-auto h-full flex items-center justify-end tabletM:justify-center">
        <div className="flex flex-col laptopM:text-right laptopM:w-1/3 mobileM:text-center space-y-6">
          <p className="font-semibold  text-[14px] tracking-[2px]">
            TESTIMONIAL
          </p>
          <p className="font-bold text-[36px]">
            <p> Having my best</p> <p>supporter in my phone</p>
            <p>available 24/7 is amazing</p>
          </p>
          <p className="flex laptopM:justify-end mobileM:justify-center space-x-4">
            <Image src={COMMENT_AVATAR_4} />
            <span className="text-white">
              <p className="text-[18px] font-semibold">Wilgot Beronius</p>
              <p className="text-[14px] font-normal">Midfielder, Maj FC</p>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
