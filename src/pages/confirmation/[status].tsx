import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Footer } from 'src/modules/landing-page/components/Footer'
import ServerError from '../500'

const AppLink = (props) => {
  const { textColor, text, url } = props
  return (
    <>
      <Link href={url} passHref>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={`${textColor} font-bold underline`}
        >
          {text}
        </a>
      </Link>
    </>
  )
}

const ConfirmSuccess = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="grid gap-10 sm:w-full md:w-1/2 px-8 py-20">
          <h3 className="text-3xl font-semibold text-[#17C78D]">
            Thanks for confirming your email.
          </h3>
          <div className="text-lg font-mono grid gap-6">
            <p>
              Remember to always have your contact information updated in your
              Zporter account. So we can support you in the best possible way.
            </p>
            <p>
              Most of the services and features you have in your Zporter app for{' '}
              <AppLink
                textColor="text-cyan-500"
                text="iOS"
                url="https://tailwindcss.com/docs/text-color"
              />{' '}
              and{' '}
              <AppLink
                textColor="text-[#17C78D]"
                text="Android"
                url="https://tailwindcss.com/docs/text-color"
              />{' '}
              devices, can also be used here in{' '}
              <AppLink
                textColor="text-yellow-500"
                text="Zporters Website"
                url="http://zporter.co/"
              />
              .
            </p>

            <p>
              Use the same user id / password to sign in and you can have
              Zporter in the browser of your desk-laptop, tablet or smartphone.
              Zporters responsive website is best used with a{' '}
              <AppLink
                textColor="text-white"
                text="Chrome"
                url="https://www.google.com/chrome/"
              />{' '}
              or{' '}
              <AppLink
                textColor="text-white"
                text="Safari"
                url="https://www.apple.com/safari/"
              />{' '}
              browser.
            </p>
            <p>
              Why not{' '}
              <AppLink
                textColor="text-[#4654EA]"
                text="check out your public Zporter Biography"
                url="https://www.apple.com/safari/"
              />{' '}
              We'll see you ⚽
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

function VerifyCode() {
  const router = useRouter()

  const { status } = router.query

  return <>{status === 'true' ? <ConfirmSuccess /> : <ServerError />}</>
}

export default VerifyCode
