import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { isDesktop, isMobile } from 'react-device-detect'
import { MyButton } from 'src/components/MyButton'
import { APP_FEATURE_3 } from 'src/constants/mocks/app-feature.constants'
import { ARROW, IT_FREE } from 'src/imports/images'
import { safeHttpImage } from 'src/utils/utils'
import { AppFeature } from './AppFeature'

export const SectionThree = () => {
  const router = useRouter()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <>
      {isDesktop ? (
        <div className="relative">
          <img
            loading="lazy"
            src={safeHttpImage(
              'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/landing-page%2Fwebp%2FLanding-4-min.webp?alt=media&token=452c53e2-8c34-4eab-9d9d-8db21f23c232'
            )}
            className={clsx('w-full')}
          />
          <div className="w-full h-[690px] bg-gradient-to-b from-white absolute top-0"></div>
          <div className="w-full h-[490px] bg-gradient-to-t from-[#0F1E54] absolute bottom-0"></div>
          <div className="absolute laptopM:top-36 2xl:top-52 w-full flex flex-col items-center">
            <div
              className={clsx(
                'relative h-[120px] flex justify-center items-center w-[390px] z-50'
              )}
            >
              <div className="absolute -right-[40px]">
                <span className="relative">
                  <span className="absolute -right-[60px] -top-[75px]">
                    <Image src={IT_FREE} />
                  </span>
                  <Image src={ARROW} />
                </span>
              </div>
              <MyButton
                onClick={scrollToTop}
                type="button"
                label="Download"
                className={clsx('w-[220px]')}
              />
            </div>
            <div className="2xl:pt-32 laptopM:pt-7 flex flex-col items-center">
              <span className="text-center text-[#09E099] text-[14px]  tracking-[2px] font-semibold">
                MESSAGES
              </span>
              <div className="laptopM:text-[90px] 2xl:text-[94px] w-[445px] font-bold text-black laptopM:space-y-2 2xl:space-y-4">
                <p className="text-right pr-32">For</p>
                <p>Family,</p>
                <p className="text-right">Friends,</p>
                <p className="pl-16">Fans</p>
              </div>
              <div className="w-[990px] pt-16">
                <div className="w-full flex justify-start text-[16px] font-medium">
                  <p className="w-1/2">
                    Perhaps the most important support to a young football
                    player are from his Family and Friends. With Zporter they
                    can follow, chat and view development and health data.
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="w-1/2">
                    To make sure the player has fun and grows in a healthy way.
                    And gets best possible support with rehab and injurys.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                'w-[1320px] 2xl:pt-72 laptopM:pt-20 grid grid-cols-4'
              )}
            >
              {APP_FEATURE_3.map((app) => (
                <AppFeature
                  key={app.title}
                  titleColor="text-white"
                  contentColor="text-white"
                  icon={app.icon}
                  title={app.title}
                  content={app.content}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mobileM:h-[700px] tabletM:h-[500px] relative">
          <img
            loading="lazy"
            src={safeHttpImage(
              'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/landing-page%2Fwebp%2FLanding-4-min.webp?alt=media&token=452c53e2-8c34-4eab-9d9d-8db21f23c232'
            )}
            className={clsx('h-full w-full object-cover absolute')}
          />
          <div className="w-full h-[190px] bg-gradient-to-b from-white absolute top-0 z-10"></div>
          <div className="absolute w-full mobileM:top-[190px] mobileL:top-[180px] flex flex-col items-center z-20">
            <div
              className={clsx(
                'grid mobileM:grid-cols-2 tabletM:grid-cols-4 tabletM:gap-x-8 tabletM:bottom-0'
              )}
            >
              {APP_FEATURE_3.map((app) => (
                <AppFeature
                  key={app.title}
                  titleColor="text-white"
                  contentColor="text-white"
                  icon={app.icon}
                  title={app.title}
                  content={app.content}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
