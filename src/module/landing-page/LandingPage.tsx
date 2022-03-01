import { Button } from 'src/components'
import { AppStoreIcon, CheckedIcon, GooglePlayIcon } from 'src/components/icons'
import { Logo } from 'src/components/logo'
import { MyButton } from 'src/components/MyButton'
import Image from 'next/image'
import {
  APP,
  APP_SHADOW,
  BALL,
  GRAPH,
  GROUP_ITEMS,
  LANDING_TABLET,
} from 'src/imports/images'
import { AppFeature } from './components/AppFeature'
import { APP_FEATURE } from 'src/constants/mocks/app-feature.constants'

export const Landing = () => {
  return (
    <div className="flex flex-col mx-0">
      <div className="text-white bg-landing-one w-full h-screen bg-no-repeat bg-cover ">
        <div className="w-full h-[190px] bg-gradient-to-t from-white  absolute bottom-0"></div>
        <span className="absolute -bottom-[130px] left-[460px] z-10">
          <Image src={BALL} />
        </span>
        <span className="absolute -bottom-[130px] left-[700px] z-20">
          <Image src={LANDING_TABLET} />
        </span>
        <span className="absolute -bottom-[115px] left-[600px] z-30">
          <Image src={GROUP_ITEMS} />
        </span>
        <span className="absolute -bottom-[185px] left-[675px] z-40">
          <Image src={GRAPH} />
        </span>
        <span className="absolute -bottom-[185px] left-[675px] z-40">
          <Image src={GRAPH} />
        </span>
        <span className="absolute -bottom-[185px] right-[525px] z-50">
          <Image src={APP} />
        </span>
        <span className="absolute -bottom-[214px] right-[525px] z-40">
          <Image src={APP_SHADOW} />
        </span>
        <div className="flex justify-between mx-[140px] mt-[30px]">
          <Logo />
          <div className="flex">
            <Button
              text="Sign in"
              type="button"
              className="text-[14px] px-[17px] py-[7px]"
            />
            <MyButton
              label="Sign up"
              type="button"
              className="text-[14px] px-[17px] py-[7px]"
            />
          </div>
        </div>
        <div className="text-center mt-[120px] w-[750px] m-auto">
          <span className="text-center text-[#09E099] text-[12px]  tracking-[2px] font-medium">
            INTRODUCING
          </span>
          <p className="text-[56px]  tracking-[2px] font-semibold">
            Zporter v.1
          </p>
          <p className="text-[16px] my-4">
            In our vision to digitize and make youth sports smarter and
            healthier. Zporter is now launching v.1 of our free software as a
            service via apps- and web, to entertain, grow and empower (future)
            football starz. Just as we intend to help their Coaches, Agents,
            PT’s, Friends, Fans and Family members to support them better in
            their most important youth football years.
          </p>
          <p className="flex items-center justify-center my-6">
            <span className="text-[14px]"> Available on the web for: </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              Smartphones
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              Tablets
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              Laptops
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              Desktops
            </span>
          </p>
          <p className="flex items-center justify-center my-6">
            <span className="text-[14px]"> Available on the web for: </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              iOS Smartphones
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} /> Android Smartphones
            </span>
          </p>
          <div className="relative">
            <span className="absolute left-[170px]">
              <AppStoreIcon />
            </span>
            <span className="absolute right-[170px]">
              <GooglePlayIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white h-[1100px] flex flex-col items-center py-[300px]">
        <span className="text-center text-[#09E099] text-[12px]  tracking-[2px] font-medium">
          FEATURE
        </span>
        <p className="text-[36px] text-black text-center  font-bold">
          App Feature
        </p>
        <div className="grid grid-cols-4 gap-x-24 gap-y-20 pt-20">
          {APP_FEATURE.map((app) => (
            <AppFeature
              icon={app.icon}
              title={app.title}
              content={app.content}
            />
          ))}
        </div>
      </div>
      <div className="bg-landing-two  h-[530px] bg-no-repeat bg-cover">abc</div>
      <div className="bg-white h-[600px]"> </div>
    </div>
  )
}
