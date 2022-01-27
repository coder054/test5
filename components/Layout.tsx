import { Header } from './Header'
import { Sidebar } from './Sidebar'
import Head from 'next/head'
import { useAuth } from 'module/authen/auth/AuthContext'
import { useRouter } from 'next/router'

export const Layout = ({
  children,
  title,
}: {
  children: any
  title: string
}) => {
  const { currentUser } = useAuth()
  const router = useRouter()

  if (!currentUser && router.pathname !== '/test2') {
    router.push('/signin')
    return null
  }

  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Header />
      <Sidebar />

      <div className="flex">
        {/* below the sidebar */}
        <div className=" w-[280px] h-screen border bg-red-500 "></div>
        <div className=" w-100vw-280px min-h-screen bg-[#111115] pt-4 px-[39px] pb-[39px] ">
          {/* below the header */}
          <div className="h-[64px]"></div>
          {children}
        </div>
      </div>
    </div>
  )
}
