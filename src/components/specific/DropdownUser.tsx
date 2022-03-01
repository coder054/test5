import clsx from 'clsx'
import {
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
  SwapIcon,
} from 'src/components/icons'
import { Text } from 'src/components/Text'
import { useAuth } from 'src/module/authen/auth/AuthContext'

const MENU_CLASS =
  'flex px-[16px] py-[8px] cursor-pointer hover:ml-2 duration-150'

export const DropdownUser = () => {
  const { currentUser, signout } = useAuth()

  return (
    <div
      style={{
        boxShadow: `0px 2px 4px 0px rgba(31, 41, 55, 0.06),
 0px 4px 4px 0px rgba(0, 0, 0, 0.25)`,
      }}
      className="w-[266px] border border-Stroke rounded-[8px] bg-[#202128cc] "
    >
      <div className="flex px-[16px] py-[14px] items-center">
        <img
          src={'/Avatar.png'}
          className="w-[40px] h-[40px] rounded-[8px] mr-[8px]"
          alt=""
        />
        <div className=" ">
          <Text name="body1" className="text-white ">
            Anika Visser
          </Text>
          <Text name="Caption" className="text-Grey ">
            Acme Global Inc.
          </Text>
        </div>
      </div>
      <div className="h-[1px] bg-Stroke "></div>
      <div className="py-[8px] ">
        {/* <div className={MENU_CLASS}>
          <ProfileIcon />
          <Text name="body1" className="text-white ">
            Profile
          </Text>
        </div> */}
        <div className={MENU_CLASS}>
          <SettingsIcon />
          <Text name="body1" className="text-white ">
            Account & Settings
          </Text>
        </div>
        <div className={MENU_CLASS}>
          <SwapIcon />
          <Text name="body1" className="text-white ">
            Change organization
          </Text>
        </div>
      </div>
      <div className="h-[1px] bg-Stroke "></div>
      <div className="py-[8px] ">
        <div className={clsx(MENU_CLASS, 'flex space-x-2')}>
          <LogoutIcon />
          <Text onClick={signout} name="body1" className="text-white">
            Logout
          </Text>
        </div>
      </div>
    </div>
  )
}
