const cls = require('./layout-update-profile.module.css')

interface LayoutLandingProps {
  authen?: boolean
  playerSkill?: boolean
  coachSkill?: boolean
  coach?: boolean
  player?: boolean
  biography?: boolean
  children: any
}

export const LayoutSignupForm = ({
  authen,
  children,
  playerSkill,
  player,
  coachSkill,
  coach,
  biography,
}: LayoutLandingProps) => {
  return (
    <div className=" w-full bg-[#000000] overflow-hidden">
      {authen && (
        <div
          className={`${cls.backgroundAuthen} w-screen min-h-screen lg:h-screen absolute lg:left-0 lg:bottom-0`}
        ></div>
      )}

      {authen && !coach && (
        <>
          <div
            className={`${cls.imageBackgroundPlayer} absolute w-0 lg:w-[808px] h-0 lg:h-[808px]`}
          ></div>
          <div className=" lg:w-[58.5px] lg:h-[58.5px] bg-[#FF9607] rounded-full absolute ml-[500px] mt-[70px]"></div>
          <div className=" lg:w-[32px] lg:h-[32px] bg-[#FFFFFF] rounded-full absolute ml-[153px] mt-[120px]"></div>
          <div className=" lg:w-[93px] lg:h-[93px] bg-[#09E099] rounded-full absolute -ml-[46.5px] mt-[400px]"></div>
          <div className=" lg:w-[39px] lg:h-[39px] bg-[#4654EA] rounded-full absolute ml-[591px] mt-[800px]"></div>
        </>
      )}
      <div className="w-full md:right-0">{children}</div>
      <div className="lg:hidden">
        <div className={`${cls.vectorTop} pointer-events-none`}></div>
        <div className={`${cls.vectorBottom} `}></div>
      </div>

      {playerSkill && (
        <>
          <div
            className={`${cls.backgroundPlayerSkill} w-0 md:w-screen min-h-screen lg:h-screen absolute lg:left-0 lg:bottom-0 z-10`}
          ></div>
          <div
            className={`${cls.rectangle} w-screen absolute min-h-screen z-10`}
          ></div>
        </>
      )}

      {coachSkill && (
        <>
          <div
            className={`${cls.backgroundCoachSkill} w-screen min-h-screen lg:h-screen absolute lg:left-0 lg:bottom-0 z-10`}
          ></div>
          <div
            className={`${cls.rectangle} w-screen absolute min-h-screen z-10`}
          ></div>
        </>
      )}

      {biography && (
        <>
          <div
            className={`${cls.backgroundBiography} w-screen min-h-screen lg:h-screen absolute lg:left-0 lg:bottom-0 z-10`}
          ></div>
        </>
      )}

      {authen && coach && (
        <>
          <div
            className={`${cls.imageBackgroundCoach} absolute w-0 lg:w-[808px] h-0 lg:h-[808px]`}
          ></div>
          <div className=" lg:w-[58.5px] lg:h-[58.5px] bg-[#FF9607] rounded-full  ml-[500px] mt-[70px]"></div>
          <div className=" lg:w-[32px] lg:h-[32px] bg-[#FFFFFF] rounded-full  ml-[153px] mt-[120px]"></div>
          <div className=" lg:w-[93px] lg:h-[93px] bg-[#09E099] rounded-full  -ml-[46.5px] mt-[400px]"></div>
          <div className=" lg:w-[39px] lg:h-[39px] bg-[#4654EA] rounded-full  ml-[591px] mt-[800px]"></div>
        </>
      )}
    </div>
  )
}
