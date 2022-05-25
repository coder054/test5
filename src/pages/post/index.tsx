import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const NewsPage: NextPage = () => {
  const router = useRouter()
  const { dynamicLink } = router.query
  const [link, setLink] = useState<string>('')
  const [device, setDevice] = useState<string>('')

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      if (dynamicLink) {
        setLink(dynamicLink as string)
      }
      setDevice('mobile')
    } else {
      setDevice('bowser')
      router.push('/sign-in')
    }
  }, [dynamicLink])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-[#4654EA] h-[42px] flex justify-center items-center w-[150px] rounded-[7px] hover:bg-[#535edf] active:bg-[#2939eb]">
        <a
          href={
            /Android/i.test(navigator.userAgent)
              ? `intent:${link}#Intent;end`
              : link
          }
          target="_blank"
        >
          Open your app
        </a>
      </div>
    </div>
  )
}

NewsPage.getLayout = (page) => <div> {page}</div>

export default NewsPage
