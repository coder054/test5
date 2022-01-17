import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="">
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
