import type { NextPage } from 'next'
import { Button } from 'src/components'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
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
        console.log('dynamicLink', dynamicLink)
        window.location.href = dynamicLink as string
      }
      setDevice('mobile')
    } else {
      setDevice('bowser')
      router.push('/sign-in')
    }
  }, [dynamicLink])

  return (
    <div className="mt-8 flex justify-center">
      {/* <a href={link}>Click to open</a> */}
    </div>
  )
}

NewsPage.getLayout = (page) => <DashboardLayout> {page}</DashboardLayout>

export default NewsPage
