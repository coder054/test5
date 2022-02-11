import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import clsx from 'clsx'
import { LogoutIcon } from 'components/icons/LogoutIcon'
import { useAuth } from 'module/authen/auth/AuthContext'
import { ComponentPropsWithRef } from 'react'
import { BackGround } from '../../common-components/Background'

type ItemProps = {
  icon: React.ReactElement
  label: string
} & ComponentPropsWithRef<'div'>

export const Terms = () => {
  const { signout } = useAuth()

  const Item = ({ label, icon, ...rest }: ItemProps) => {
    return (
      <div
        className={clsx(
          'flex justify-between cursor-pointer hover:bg-white  rounded-[4px] duration-200 px-4 py-2.5'
        )}
        {...rest}
      >
        <h1 className="text-[#818389] text-[16px] font-semibold">{label}</h1>
        <span>{icon}</span>
      </div>
    )
  }
  return (
    <BackGround
      label="Terms"
      form={
        <div className="space-y-4">
          <Item label="Support" icon={<ArrowForwardIosIcon />} />
          <Item label="Terms & Conditions" icon={<ArrowForwardIosIcon />} />
          <Item label="Privacy rules" icon={<ArrowForwardIosIcon />} />
          <Item label="Delete user profile" icon={<ArrowForwardIosIcon />} />
          <Item onClick={signout} label="Log out" icon={<LogoutIcon />} />
        </div>
      }
    />
  )
}
