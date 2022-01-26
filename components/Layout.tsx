import { Header } from './Header'
import { Sidebar } from './Sidebar'
import Head from 'next/head'

export const Layout = ({
  children,
  title,
}: {
  children: any
  title: string
}) => {
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
