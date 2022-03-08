import Image from 'next/image'
import { Button } from 'src/components'
import {
  AppStoreIcon,
  CheckedIcon,
  DevTalksIcon,
  DoubleQuote2Icon,
  DoubleQuoteIcon,
  GoalsIcon,
  GooglePlayIcon,
  ReportsIcon,
  SkillsReviewsIcon,
} from 'src/components/icons'
import { Logo } from 'src/components/logo'
import {
  APP_FEATURE,
  APP_FEATURE_2,
} from 'src/constants/mocks/app-feature.constants'
import {
  APP,
  APP_SHADOW,
  ARROW,
  BALL,
  COMMENT_AVATAR,
  COMMENT_AVATAR_3,
  GRAPH,
  GROUP_ITEMS,
  IT_FREE,
  LANDING_TABLET,
  NEO,
  NEO_MIRROR,
  TEAM,
  PLAYER,
  GOAL,
  APP_2,
  BALL_2,
  COMMENT_NICK,
  LANDING_4,
  APP_STORE_WHITE,
  GOOGLE_PLAY_WHITE,
  GROUP_DEVICES,
  GOAL_KEERPER,
  APP_4,
} from 'src/imports/images'
import { AppFeature } from './components/AppFeature'
import { MyButton } from 'src/components/MyButton'
import { isMobile, isDesktop } from 'react-device-detect'
import clsx from 'clsx'

export const Landing = () => {
  return (
    <div className="flex flex-col bg-white">
      <div className="text-white bg-landing-one w-full h-screen bg-no-repeat bg-cover">
        <div className="w-full h-[190px] bg-gradient-to-t from-white  absolute bottom-0"></div>
        <div
          className={clsx(
            'flex justify-between  mt-[30px]',
            isDesktop && 'max-w-[1320px] mx-auto',
            isMobile && 'mr-[10px]'
          )}
        >
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
        <div
          className={clsx(
            'text-center   ',
            isMobile && 'w-full px-[30px] mt-[70px]',
            isDesktop && 'max-w-[1320px] px-[250px] mt-[120px] mx-auto'
          )}
        >
          <span className="text-center text-[#09E099] text-[12px]  tracking-[2px] font-medium">
            INTRODUCING
          </span>
          <p className="text-[56px]  tracking-[2px] font-semibold">
            Zporter v.1
          </p>
          <p className={clsx('text-[16px] my-4', isMobile && 'text-center')}>
            In our vision to digitize and make youth sports smarter and
            healthier. Zporter is now launching v.1 of our free software as a
            service via apps- and web, to entertain, grow and empower (future)
            football starz. Just as we intend to help their Coaches, Agents,
            PT’s, Friends, Fans and Family members to support them better in
            their most important youth football years.
          </p>
          <p
            className={clsx(
              'items-center justify-center my-6',
              isMobile ? 'grid grid-cols-2 gap-y-4' : 'flex'
            )}
          >
            <span className={clsx('text-[14px]', isMobile && 'col-span-2')}>
              Available on the web for:
            </span>
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
          <p
            className={clsx(
              'items-center justify-center my-6',
              isMobile ? 'grid grid-cols-2 gap-y-4' : 'flex'
            )}
          >
            <span className={clsx('text-[14px]', isMobile && 'col-span-2')}>
              Available on the web for:
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} />
              iOS Smartphones
            </span>
            <span className="flex items-center mx-3 font-medium text-[14px]">
              <CheckedIcon style={{ marginRight: 4 }} /> Android Smartphones
            </span>
          </p>
          <div className="space-x-2">
            <Image src={APP_STORE_WHITE} />
            <Image src={GOOGLE_PLAY_WHITE} />
          </div>
          {!isMobile && (
            <div className="mr-[90px] mt-[110px]">
              <Image src={GROUP_DEVICES} />
            </div>
          )}
        </div>
      </div>
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
          App Feature
        </p>
        <div
          className={clsx(
            'grid ',
            isMobile && 'grid-cols-2 gap-y-6',
            isDesktop && ' grid-cols-4 gap-y-20 gap-x-24 pt-20'
          )}
        >
          {APP_FEATURE.map((app) => (
            <AppFeature
              titleColor="text-black"
              icon={app.icon}
              title={app.title}
              content={app.content}
            />
          ))}
        </div>
      </div>
      <div
        className={clsx(
          'bg-landing-two bg-no-repeat bg-cover',
          isMobile && 'h-[420px]',
          isDesktop && 'h-[530px] relative'
        )}
      >
        {isDesktop && (
          <>
            <div className="absolute z-20 my-auto right-[340px] -bottom-[6px]">
              <Image src={NEO} />
            </div>
            <div className="absolute z-10  right-[470px] -bottom-[6px]">
              <Image src={NEO_MIRROR} />
            </div>
          </>
        )}
        <div
          className={clsx(
            'h-full bg-gradient-to-r from-white  absolute ',
            isMobile && 'w-[200px] -left-20',
            isDesktop && 'w-[1000px] -left-96'
          )}
        ></div>
        <div
          className={clsx(
            isDesktop &&
              'max-w-[1320px] absolute left-[340px] top-[100px] w-[350px] space-y-4 ',
            isMobile && 'my-[60px] ml-[65px]'
          )}
        >
          <span className="text-center font-semibold text-[#4654EA] text-[14px] tracking-[2px] ">
            TESTIMONIAL
          </span>
          <p className="text-black text-[36px] font-bold relative">
            <span className="absolute -left-14 top-[14px]">
              <DoubleQuoteIcon />
            </span>
            Zporter makes me visible to all Scouts, Agents and Club Managers.
          </p>
          <div className="flex space-x-4">
            <Image src={COMMENT_AVATAR} />
            <span className="text-black">
              <p className="text-[18px] font-semibold">Neo Jönsson</p>
              <p className="text-[14px] font-normal">Forward, Maj FC</p>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div
          className={clsx(
            'bg-white ',
            isDesktop && 'h-[600px] max-w-[1320px] mx-auto pt-[190px]'
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
              There’s millions of football players who doesn’t get the support
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
              'relative h-[120px] flex items-center w-[390px]',
              isMobile && 'px-[30px]'
            )}
          >
            <span className="absolute right-0 top-[10px]">
              <Image src={IT_FREE} />
            </span>
            <MyButton
              type="button"
              label="Sign up"
              className={clsx(
                isDesktop && 'w-[220px]',
                isMobile && 'w-[170px] px-[10px]'
              )}
            />
            <span className="ml-4">
              <Image src={ARROW} />
            </span>
          </div>
        </div>
        <div
          className={clsx(
            'bg-landing-three bg-no-repeat bg-cover relative',
            isDesktop && ' mx-auto h-[1450px]  flex flex-col items-center',
            isMobile && 'h-[850px]'
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
                isMobile && 'grid-cols-2 my-[40px] py-[50px] gap-y-6',
                isDesktop && 'grid-cols-4 pt-[1000px] gap-y-20 gap-x-24'
              )}
            >
              {APP_FEATURE_2.map((app) => (
                <AppFeature
                  titleColor="text-white w-[160px] text-center"
                  contentColor={isMobile && 'text-white'}
                  icon={app.icon}
                  title={app.title}
                  content={app.content}
                />
              ))}
            </div>
            <div
              className={clsx(
                'space-x-2 flex justify-center my-5',
                isMobile && 'mt-0'
              )}
            >
              <Image src={APP_STORE_WHITE} />
              <Image src={GOOGLE_PLAY_WHITE} />
            </div>
          </div>
        </div>
      </div>
      <div className={isDesktop && 'w-full h-[600px]'}>
        <div
          className={clsx(
            'flex mx-auto justify-between items-center',
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
                  isDesktop && 'top-[10px]  right-0'
                )}
              >
                <Image src={IT_FREE} />
              </span>
              <MyButton
                type="button"
                label="Sign up"
                className={clsx(
                  isDesktop && 'w-[220px]',
                  isMobile && 'w-[170px] px-[10px]'
                )}
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
      <div
        className={clsx(
          'relative ',
          isDesktop &&
            'h-[1600px] max-w-[1320px] flex flex-col items-center py-8 mx-auto'
        )}
      >
        <p
          className={clsx(
            'font-bold text-black text-[30px]',
            isDesktop && 'mb-14',
            isMobile && 'px-[30px] mb-6'
          )}
        >
          For the best Coaches
        </p>
        <div
          className={clsx(
            'text-[#6B7280] font-medium text-[16px] ',
            isDesktop && 'grid grid-cols-3 gap-x-10 gap-y-28 text-center mb-24',
            isMobile && 'flex flex-col mx-[30px] space-y-6'
          )}
        >
          <p>
            Coaches and Personal Trainers that wants go give their ambitious
            players the best possible support, no matter what club they are part
            of.
          </p>
          <p>
            Can use Zporter to help them set goals, run skills reviews, digital
            development talks and give them instant feedbacks after matches and
            trainings.
          </p>
          <p>
            And of course mix real life trainings with digital programs and
            challenges to help their players learn faster and smarter.
          </p>
        </div>
        {isMobile && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            <AppFeature
              titleColor={clsx(
                'text-black text-center',
                isMobile && 'w-[130px]'
              )}
              icon={<GoalsIcon />}
              title="GOALS"
              content="Helping Players To Set Smart Goals To Aim For"
            />
            <AppFeature
              titleColor={clsx(
                'text-black text-center',
                isMobile && 'w-[130px]'
              )}
              icon={<DevTalksIcon />}
              title="DEV. TALKS"
              content="Run Frequent Feedback Talks"
            />
            <AppFeature
              titleColor={clsx(
                'text-black text-center',
                isMobile && 'w-[190px]'
              )}
              icon={<SkillsReviewsIcon />}
              title="SKILLS REVIEWS"
              content="Performance Reviews & Match Feedback"
            />
            <AppFeature
              titleColor={clsx(
                'text-black text-center',
                isMobile && 'w-[100px]'
              )}
              icon={<ReportsIcon />}
              title="REPORTS"
              content="Reports & Analytics On Health & Skills Development (Q4 2022)"
            />
          </div>
        )}
        {isDesktop && (
          <div className={clsx('grid grid-cols-3 gap-x-10 gap-y-28')}>
            <div
              className={clsx('text-center ', isDesktop && 'mt-28 space-y-20')}
            >
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',

                  isDesktop && 'w-[160px]'
                )}
                icon={<GoalsIcon />}
                title="GOALS"
                content="Helping Players To Set Smart Goals To Aim For"
              />
              <AppFeature
                titleColor={clsx(
                  'text-black text-center',

                  isDesktop && 'w-[160px]'
                )}
                icon={<DevTalksIcon />}
                title="DEV. TALKS"
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
                content="Reports & Analytics On Health & Skills Development (Q4 2022)"
              />
            </div>
          </div>
        )}
        <div
          className={clsx(
            isDesktop && 'w-[700px] flex flex-col items-center mt-40',
            isMobile && 'mt-8 mx-[30px]'
          )}
        >
          <span
            className={clsx(
              'font-semibold text-[#17C78D] text-[14px] tracking-[2px] ',
              isMobile && 'text-left'
            )}
          >
            TESTIMONIAL
          </span>
          <p className="text-black text-center text-[36px] font-bold relative mb-7 mt-2">
            {isDesktop && (
              <span className="absolute -left-[12px] -top-[10px]">
                <DoubleQuoteIcon />
              </span>
            )}
            Try us out, download the Zporter app from the App store or Google
            Play
          </p>
          <div className="flex space-x-4">
            <Image src={COMMENT_NICK} />
            <span className="text-black">
              <p className="text-[18px] font-semibold">Nicklas Jönsson</p>
              <p className="text-[14px] font-normal">Founder, Zporter</p>
            </span>
          </div>
          <div
            className={clsx(
              'space-x-2 flex justify-center my-5',
              isMobile && 'mt-4'
            )}
          >
            <Image src={APP_STORE_WHITE} />
            <Image src={GOOGLE_PLAY_WHITE} />
          </div>
        </div>
      </div>
      {/* <div className="bg-landing-four h-[1500px] bg-auto"></div> */}
      {/* <div
        style={{ backgroundImage: 'url(/assets/landing-page/Landing-4.png)' }}
      ></div> */}
      <img
        src="/assets/landing-page/Landing-4.png"
        className={clsx('relative', isMobile && 'h-[5 00px]')}
      />
    </div>
  )
}
