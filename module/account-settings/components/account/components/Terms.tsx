import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import clsx from 'clsx'
import { LogoutIcon } from 'components/icons/LogoutIcon'
import { useAuth } from 'module/authen/auth/AuthContext'
import { ComponentPropsWithRef } from 'react'
import { BackGround } from '../../common-components/Background'

const icon = (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.09 16.59L13.67 12L9.09 7.41L10.5 6L16.5 12L10.5 18L9.09 16.59Z"
      fill="#818389"
    />
  </svg>
)

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
          <Item label="Support" icon={icon} />
          <Item label="Terms & Conditions" icon={icon} />
          <Item label="Privacy rules" icon={icon} />
          <Item label="Delete user profile" icon={icon} />
          <Item onClick={signout} label="Log out" icon={<LogoutIcon />} />
        </div>
      }
    />
  )
}
