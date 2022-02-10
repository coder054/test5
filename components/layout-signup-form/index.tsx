import cls from './layout-signup-form.module.css'

interface LayoutLandingProps {
  authen?: boolean
  children: any
}

export const LayoutSignupForm = ({ authen, children }: LayoutLandingProps) => {
  return (
    <div className="h-screen w-full bg-[#000000] relative">
      {authen && (
        <div
          className={`${cls.backgroundAuthen} w-screen h-screen absolute left-0 bottom-0`}
        ></div>
      )}
      <div
        className={`${cls.imageBackground} absolute w-[808px] h-[808px]`}
      ></div>
      <div className="absolute right-0">{children}</div>
      <div className="w-[58.5px] h-[58.5px] bg-[#FF9607] rounded-full absolute ml-[500px] mt-[70px]"></div>
      <div className="w-[32px] h-[32px] bg-[#FFFFFF] rounded-full absolute ml-[153px] mt-[120px]"></div>
      <div className="w-[93px] h-[93px] bg-[#09E099] rounded-full absolute -ml-[46.5px] mt-[400px]"></div>
      <div className="w-[39px] h-[39px] bg-[#4654EA] rounded-full absolute ml-[591px] mt-[800px]"></div>
    </div>
  )
}
