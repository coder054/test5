import clsx from 'clsx'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useState } from 'react'
import { Landing } from 'src/modules/landing-page/LandingPage'
import { safeHttpImage } from 'src/utils/utils'
import CookiesPolicy from './policy'

const LandingPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const ACCEPTED = localStorage.getItem('COOKIES')

  const handleSubmit = () => {
    localStorage.setItem('COOKIES', 'ACCEPTED')
  }

  return (
    <div className="relative">
      <Head>
        <title>
          Zporter - Collect, grow and share your football skills globally for
          free
        </title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta
          name="description"
          content="Zporter is a free service via web and apps to entertain, grow and empower young football talents. Presenting young football players skills online to all the world's football Agents, Scouts and Club Managers."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="keywords" content="Football, Young, Talent, Player" />
        <meta
          name="keywords"
          content="Entertain, Grow, Develop, Empower, Skills, Data, Health, Injury’s, Agent, Coach, Manager, PT, Supporter, Fans, Soccer, Player Profiles, Skills Chart, Trophies, Awards, Caps, Statistics, Goals, Assists, Training Hours, Training sessions, Technics, Tactics, Physics, Mental,Biography, Feed, News, Dashboard, Leaderboard, Star of the Match, Dream Team, VR Manager, Tests, Challenges, Programs, Goals, Development Talk"
        />
        <meta
          property="og:description"
          content="Zporter - All the World's Football Talents!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zporter.co" />
        <meta
          property="og:image"
          content={safeHttpImage(
            'https://firebasestorage.googleapis.com/v0/b/zporter-dev.appspot.com/o/favicon.ico?alt=media&token=213a4ea4-f62a-46c7-874f-ad38a2598ef7'
          )}
        />
      </Head>

      <motion.div
        exit={{ opacity: 0, y: 40 }}
        animate={{ opacity: ACCEPTED ? 0 : 1, y: ACCEPTED ? 40 : 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 1.5 }}
        className={clsx(
          'bg-Dark-1 text-white bg-opacity-80  text-base font-medium px-8 py-5 rounded-lg fixed bottom-4 right-4 left-4 mx-5 z-50 flex justify-between items-center'
        )}
      >
        <p>
          We use cookies to better understand how this site is used. By using
          this site, you consent to this policy.{' '}
          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="underline cursor-pointer hover:text-blue-300 duration-150"
          >
            Click to learn more
          </button>
        </p>
        <motion.button
          onClick={handleSubmit}
          className="px-9 py-2 rounded-lg bg-light_green font-base font-medium active:opacity-70 duration-150"
        >
          Accept all
        </motion.button>
        <CookiesPolicy
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
          onSubmit={handleSubmit}
        />
      </motion.div>
      <Landing />
    </div>
  )
}

export default LandingPage
