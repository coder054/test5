import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { isDesktop, isMobile, isTablet } from 'react-device-detect'
import { Button } from 'src/components'
import {
  CheckedIcon,
  DevTalksIcon,
  DoubleQuote2Icon,
  DoubleQuoteIcon,
  GoalsIcon,
  ReportsIcon,
  SkillsReviewsIcon,
} from 'src/components/icons'
import { Logo } from 'src/components/logo'
import { MyButton } from 'src/components/MyButton'
import {
  APP_FEATURE,
  APP_FEATURE_2,
} from 'src/constants/mocks/app-feature.constants'
import {
  APP_4,
  ARROW,
  COMMENT_AVATAR,
  COMMENT_AVATAR_3,
  COMMENT_NICK,
  GOAL_KEERPER,
  GROUP_DEVICES,
  IT_FREE,
  NEO,
  NEO_MIRROR,
  PLAYER_2,
  PLAYER_3,
  TEAM,
} from 'src/imports/images'
import { safeHttpImage } from 'src/utils/utils'
import { AppFeature } from './components/AppFeature'
import DownloadGroup from './components/DownloadGroup'
import { Footer } from './components/Footer'
import { SectionFive } from './components/SectionFive'
import { SectionFour } from './components/SectionFour'
import { SectionThree } from './components/SectionThree'

export const Landing = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col bg-black relative">
      <div
        className="relative w-full h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${safeHttpImage(
            'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/landing-page%2Fwebp%2FLanding-1-min.webp?alt=media&token=eae4a320-dc6d-4d51-bf45-303a85b0517f'
          )})`,
        }}
      >
        <div className="w-full h-[190px] bg-gradient-to-t from-white  absolute bottom-0 mobileM:hidden laptopM:block"></div>
        <div className="flex justify-between mx-[14px] mt-[30px] laptopM:max-w-[1320px] laptopM:mx-auto tabletM:px-11">
          <Logo />
          <div className="flex invisible">
            <Link href="sign-in">
              <Button
                text="Sign in"
                type="button"
                className="text-[14px] px-[17px] py-[7px]"
              />
            </Link>
            <MyButton
              label="Sign up"
              type="button"
              className="text-[14px] px-[17px] py-[7px]"
            />
          </div>
        </div>
        <div className="text-center w-full px-[30px] mt-[70px] tabletM:w-2/5 laptopM:w-4/6 tabletM:mx-auto">
          <span className="text-center text-[#09E099] text-[12px]  tracking-[2px] font-medium">
            INTRODUCING
          </span>
          <p className="laptopM:text-[56px] mobileM:text-[26px] tracking-[2px] font-semibold">
            Zporter v.1
          </p>
          <p className="text-[16px] my-4 text-center">
            In our vision to digitize and make youth sports smarter and
            healthier. Zporter is now launching v.1 of our free software as a
            service via apps- and web, to entertain, grow and empower (future)
            football starz in a smarter and healthier way.<br></br>
          </p>
          <p
            className={clsx(
              'flex mobileM:flex-col laptopM:flex-row items-center justify-center my-6'
            )}
          >
            <span
              className={clsx(
                'mobileM:font-medium laptopM:font-normal text-[16px] mobileM:col-span-2'
              )}
            >
              Available on the web for:
            </span>
            {isDesktop ? (
              <>
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
              </>
            ) : (
              <p className="text-[12px] italic">
                Smartphones, Tablets, Laptops, Desktops
              </p>
            )}
          </p>
          <p
            className={clsx(
              'flex mobileM:flex-col laptopM:flex-row items-center justify-center my-6'
            )}
          >
            <span
              className={clsx(
                'mobileM:font-medium laptopM:font-normal text-[16px] mobileM:col-span-2'
              )}
            >
              Available via apps for:
            </span>
            {isDesktop ? (
              <>
                <span className="flex items-center mx-3 font-medium text-[14px]">
                  <CheckedIcon style={{ marginRight: 4 }} />
                  iOS Smartphones
                </span>
                <span className="flex items-center mx-3 font-medium text-[14px]">
                  <CheckedIcon style={{ marginRight: 4 }} /> Android Smartphones
                </span>
              </>
            ) : (
              <p className="text-[12px] italic">
                iOS Smartphones, Android Smartphones
              </p>
            )}
          </p>
          <DownloadGroup />
          {!isMobile && (
            <div className="mr-[90px] mt-[160px]">
              <Image src={GROUP_DEVICES} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-white">
        <div
          className={clsx(
            'bg-white flex flex-col items-center ',
            isDesktop && 'h-[1100px] py-[300px] mx-auto max-w-[1320px]',
            isMobile && 'space-y-8 py-8'
          )}
        >
          <span className="text-center text-[#09E099] text-[12px]  tracking-[2px] font-medium">
            FEATURE
          </span>
          <p className="text-[36px] text-black text-center  font-bold">
            App Features
          </p>
          <div
            className={clsx(
              'grid mobileM:grid-cols-2 mobileM:gap-y-6 mobileM:gap-x-2 px-[20px] tabletM:grid-cols-4 tabletM:gap-y-20 tabletM:gap-x-24 tabletM:pt-10 laptopM:pt-20 tabletM:px-20'
            )}
          >
            {APP_FEATURE.map((app) => (
              <AppFeature
                key={app.title}
                titleColor="text-black"
                contentColor="text-gray-400"
                icon={app.icon}
                title={app.title}
                content={app.content}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${safeHttpImage(
            'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/landing-page%2Fwebp%2FLanding-2-min.webp?alt=media&token=4fb1d353-e7e9-4c37-aa5f-31435d013d50'
          )})`,
        }}
        className={clsx(
          ' bg-no-repeat bg-cover relative',
          isMobile && 'h-[420px]',
          isDesktop && 'h-[530px]'
        )}
      >
        {isDesktop && (
          <>
            <div className="absolute z-20 my-auto 2xl:right-[340px] laptopM:right-[150px]  -bottom-[6px]">
              <Image src={NEO} />
            </div>
            <div className="absolute z-10 2xl:right-[470px] laptopM:right-[270px] -bottom-[6px]">
              <Image src={NEO_MIRROR} />
            </div>
          </>
        )}

        <div
          className={clsx(
            '  from-white  absolute  z-10',
            isMobile && 'h-[200px] bg-gradient-to-t w-full bottom-0',
            isDesktop && 'h-full bg-gradient-to-r w-[1000px] -left-96'
          )}
        ></div>
        <div
          className={clsx(
            isDesktop &&
              'max-w-[1320px] absolute left-[340px] top-[100px] w-[350px] space-y-4 ',
            isTablet && 'absolute left-[80px] w-[340px] space-y-4',
            isMobile && 'mb-[30px] mt-[50px] ml-[75px] mr-[20px] space-y-4'
          )}
        >
          <span className="text-center font-semibold text-[#4654EA] text-[14px] tracking-[2px] ">
            TESTIMONIAL
          </span>
          <p
            className={clsx(
              'text-black mobileM:text-[30px] laptopM:text-[36px] font-bold relative',
              isMobile && 'text-white z-10'
            )}
          >
            <span className="absolute -left-14 top-[14px]">
              <DoubleQuoteIcon />
            </span>
            Zporter makes me visible to all Scouts, Agents and Club Managers.
          </p>
          <div className="flex space-x-4">
            <Image src={COMMENT_AVATAR} className="z-10" />
            <span className="text-black z-10">
              <p className="text-[18px] font-semibold">Neo J??nsson</p>
              <p className="text-[14px] font-normal">Forward, Maj FC</p>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div
          className={clsx(
            'bg-white ',
            isDesktop && 'h-[600px] max-w-[1320px] mx-auto pt-[190px]',
            isTablet && 'px-11'
          )}
        >
          <p
            className={clsx(
              'text-[36px] text-black font-bold',
              isMobile && 'pt-[30px] px-[30px]'
            )}
          >
            For all Players
          </p>
          <div
            className={clsx(
              ' text-black text-[16px] font-medium gap-x-16 pt-6 pb-4',
              isMobile && 'flex flex-col space-y-6 px-[30px]',
              isDesktop && 'grid grid-cols-3'
            )}
          >
            <p>
              There???s millions of football players who doesn???t get the support
              they deserve in their young and most important years as a football
              player. Zporter will from now on be their best supporter.
            </p>
            <p>
              As we entertain, grow and empower them. Using some smart
              integrations and a simple diary to collect players health,
              training and match data. Zporter will give all players an amazing
              Biography and Dashboard.
            </p>
            <p>
              To present and benchmark their football skills and statistics. And
              as they test and learn more about their technical, tactical,
              physical and mental skills. They will be recommended smart
              programs and professional events to grow their skills smarter and
              faster.
            </p>
          </div>
          <div
            className={clsx(
              'relative h-[120px] flex items-center w-[375px]',
              isMobile && 'px-[30px]'
            )}
          >
            <span className="absolute mobileM:right-4 laptopM:right-0 top-[10px]">
              <Image src={IT_FREE} />
            </span>
            <MyButton
              onClick={scrollToTop}
              type="button"
              label="Download"
              className="laptopM:w-[220px] mobileM:w-[160px] mobileM:px-[10px]"
            />
            <span className="ml-4">
              <Image src={ARROW} />
            </span>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${safeHttpImage(
              'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/landing-page%2Fwebp%2FLanding-3-min.webp?alt=media&token=d2e38371-140f-4681-8875-b11266ec6049'
            )})`,
          }}
          className={clsx(
            ' bg-no-repeat bg-cover relative',
            isDesktop && ' mx-auto h-[1450px]  flex flex-col items-center',
            isMobile && 'h-[850px]',
            isTablet && 'h-[550px]'
          )}
        >
          {isDesktop && (
            <div className="w-full h-[140px] bg-white z-10 absolute top-0"></div>
          )}

          {isDesktop && (
            <div className="w-full h-[600px] bg-gradient-to-b from-white z-10 absolute top-[140px]"></div>
          )}
          <div
            className={clsx(
              isDesktop && 'max-w-[1320px] px-auto',
              isMobile && 'flex flex-col'
            )}
          >
            {isDesktop && (
              <div className="absolute ml-[110px] z-20 bottom-[540px]">
                <Image src={TEAM} />
              </div>
            )}
            <div
              className={clsx(
                'grid ',
                isMobile && 'grid-cols-2 my-[40px] py-[50px] gap-y-6 px-[20px]',
                isTablet && 'grid-cols-4 my-auto py-[50px] gap-y-6 px-[30px]',
                isDesktop && 'grid-cols-4 pt-[1000px] gap-y-20 gap-x-24'
              )}
            >
              {APP_FEATURE_2.map((app) => (
                <AppFeature
                  key={app.title}
                  titleColor="text-white w-[160px] text-center"
                  contentColor={isMobile && 'text-white'}
                  icon={app.icon}
                  title={app.title}
                  content={app.content}
                />
              ))}
            </div>
            <DownloadGroup />
          </div>
        </div>
      </div>
      <div className="tabletM:w-full tabletM:h-[600px] bg-white">
        <div
          className={clsx(
            'flex mx-auto justify-between items-center tabletM:px-12',
            isDesktop && 'max-w-[1320px]  '
          )}
        >
          <div
            className={clsx(
              'space-y-4',
              isDesktop && ' w-[400px]',
              isMobile && 'my-8 mx-[30px] w-full'
            )}
          >
            <span className="text-center font-semibold text-[#17C78D] text-[14px] tracking-[2px]">
              TESTIMONIAL
            </span>
            <p className="text-black text-[36px] font-bold relative">
              {isDesktop && (
                <span className="absolute -right-12 top-[14px]">
                  <DoubleQuote2Icon />
                </span>
              )}
              Benchmarking my health & football data tells me what I have to
              improve
            </p>
            <div className="flex space-x-4">
              <Image src={COMMENT_AVATAR_3} />
              <span className="text-black">
                <p className="text-[18px] font-semibold">Timo Lauritzen</p>
                <p className="text-[14px] font-normal">Wingback, Lyngby BK</p>
              </span>
            </div>
            <div
              className={clsx(
                'relative flex  items-center ',
                isDesktop && ' h-[120px] w-[390px]'
              )}
            >
              <span
                className={clsx(
                  'absolute',
                  isMobile && '-top-[4px] -right-[12px]',
                  isDesktop && 'top-[10px]  right-0',
                  isTablet && 'top-[10px] left-[240px]'
                )}
              >
                <Image src={IT_FREE} />
              </span>
              <MyButton
                onClick={scrollToTop}
                type="button"
                label="Download"
                className="laptopM:w-[220px] mobileM:w-[170px] mobileM:px-[10px] tabletM:[w-[180px]"
              />
              <span className="ml-4">
                <Image src={ARROW} />
              </span>
            </div>
          </div>
          {isDesktop && (
            <div className="">
              <Image src={GOAL_KEERPER} />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white mobileM:h-[1320px] mobileL:h-[1250px] laptopM:h-[1550px] tabletM:h-[1250px] tabletM:px-12">
        <div className="relative z-20  laptopM:w-[1320px] laptopM:flex laptopM:flex-col laptopM:items-center laptopM:py-8 laptopM:mx-auto">
          {isDesktop && (
            <span className="absolute 2xl:-bottom-[90px] laptopM:-bottom-[30px] xl:-right-[50px] 2xl:-right-[290px]">
              <Image src={PLAYER_2} />
            </span>
          )}
          {isDesktop && (
            <span className="absolute 2xl:-bottom-[45px] laptopM:bottom-0 xl:-left-[60px] 2xl:-left-[290px]">
              <Image src={PLAYER_3} />
            </span>
          )}
          <p
            className={clsx(
              'font-bold text-black text-[30px] laptopM:mb-14 mobileM:px-[30px] mobileM:mb-6'
            )}
          >
            For the best Coaches
          </p>
          <div
            className={clsx(
              'text-[#6B7280] font-medium text-[16px] ',
              isDesktop &&
                'grid grid-cols-3 gap-x-10 gap-y-28 text-center mb-24',
              isMobile && 'flex flex-col mx-[30px] space-y-6'
            )}
          >
            <p>
              Coaches and Personal Trainers that wants go give their ambitious
              players the best possible support, no matter what club they are
              part of.
            </p>
            <p>
              Can use Zporter to help them set goals, run skills reviews,
              digital development talks and give them instant feedbacks after
              matches and trainings.
            </p>
            <p>
              And of course mix real life trainings with digital programs and
              challenges to help their players learn faster and smarter.
            </p>
          </div>
          {isMobile && (
            <div className="grid grid-cols-2 gap-6 px-[30px] pt-12 mt-6">
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',
                  isMobile && 'w-[130px]'
                )}
                icon={<GoalsIcon />}
                title="GOALS"
                contentColor="text-gray-400"
                content="Helping Players To Set Smart Goals To Aim For"
              />
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',
                  isMobile && 'w-[130px]'
                )}
                icon={<DevTalksIcon />}
                title="DEV. TALKS"
                contentColor="text-gray-400"
                content="Run Frequent Feedback Talks"
              />
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',
                  isMobile && 'w-[190px]'
                )}
                icon={<SkillsReviewsIcon />}
                title="SKILLS REVIEWS"
                contentColor="text-gray-400"
                content="Performance Reviews & Match Feedback"
              />
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',
                  isMobile && 'w-[100px]'
                )}
                icon={<ReportsIcon />}
                title="REPORTS"
                contentColor="text-gray-400"
                content="Reports & Analytics On Health & Skills Development (Q4 2022)"
              />
            </div>
          )}
          {isDesktop && (
            <div className={clsx('grid grid-cols-3 gap-x-10 gap-y-28')}>
              <div
                className={clsx(
                  'text-center ',
                  isDesktop && 'mt-28 space-y-20'
                )}
              >
                <AppFeature
                  titleColor={clsx(
                    'text-black text-center',

                    isDesktop && 'w-[160px]'
                  )}
                  icon={<GoalsIcon />}
                  title="GOALS"
                  contentColor="text-gray-400"
                  content="Helping Players To Set Smart Goals To Aim For"
                />
                <AppFeature
                  titleColor={clsx(
                    'text-black text-center',

                    isDesktop && 'w-[160px]'
                  )}
                  icon={<DevTalksIcon />}
                  title="DEV. TALKS"
                  contentColor="text-gray-400"
                  content="Run Frequent Feedback Talks"
                />
              </div>
              <div className="-ml-10">
                <Image src={APP_4} />
              </div>
              <div className={clsx('text-center mt-28 space-y-20')}>
                <AppFeature
                  titleColor={clsx(
                    'text-black text-center',
                    isDesktop && 'w-[190px]'
                  )}
                  icon={<SkillsReviewsIcon />}
                  contentColor="text-gray-400"
                  title="SKILLS REVIEWS"
                  content="Performance Reviews & Match Feedback"
                />
                <AppFeature
                  titleColor={clsx(
                    'text-black text-center',
                    isDesktop && 'w-[160px]'
                  )}
                  icon={<ReportsIcon />}
                  title="REPORTS"
                  contentColor="text-gray-400"
                  content="Reports & Analytics On Health & Skills Development (Q4 2022)"
                />
              </div>
            </div>
          )}
          <div
            className={clsx(
              'relative mb-[250px]',
              isDesktop && 'w-[700px] flex flex-col items-center mt-40',
              isMobile && 'mt-8 mx-[30px]'
            )}
          >
            <span
              className={clsx(
                'font-semibold text-[#17C78D] text-[14px] tracking-[2px] ',
                isMobile && 'block text-center'
              )}
            >
              TESTIMONIAL
            </span>
            <p className="text-black text-center text-[36px] font-bold  relative mb-7 mt-2 tabletM:px-12">
              {isDesktop && (
                <span className="absolute -left-[12px] -top-[10px]">
                  <DoubleQuoteIcon />
                </span>
              )}
              Try us out, download the Zporter app from the App store or Google
              Play
            </p>
            <div className="flex justify-center space-x-4">
              <Image src={COMMENT_NICK} objectFit="cover" />
              <span className="text-black">
                <p className="text-[18px] font-semibold">Nicklas J??nsson</p>
                <p className="text-[14px] font-normal">Founder, Zporter</p>
              </span>
            </div>
            <DownloadGroup />
          </div>
        </div>
      </div>
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <Footer />
    </div>
  )
}
