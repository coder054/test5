import { Divider, Tab, Tabs, Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { LogoBigSize } from 'src/components'
import LoginEmail from './components/LoginEmail'
import LoginSMS from './components/LoginSMS'
import LoginUserName from './components/LoginUserName'

const tabs = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' },
  { label: 'User name', value: 'userName' },
]

const SignIn = () => {
  const [currentTab, setCurrentTab] = useState<string>('email')

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div className="w-screen h-screen flex tabletM:justify-center tabletM:space-x-48 items-center bg-authen-desktop bg-no-repeat bg-cover">
      <div className="bg-[#111827] mobileM:w-screen mobileM:h-screen flex flex-col tabletM:justify-center mobileM:justify-start mobileM:pt-7 tabletM:w-[570px] tabletM:rounded-lg tabletM:h-fit p-8">
        <img
          alt="Zporter"
          src="/zporter.png"
          className="w-[150px] h-[34px] cursor-pointer mobileM:block tabletM:hidden"
        />
        <div className="flex items-center mobileM:mt-12 tabletM:mt-0">
          <div>
            <Typography variant="h4">Sign in</Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
              Sign in to Zporter.co - All Talents United
            </Typography>
          </div>
        </div>
        <Tabs
          indicatorColor="secondary"
          onChange={handleTabsChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          value={currentTab}
          sx={{ my: 3 }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        {currentTab === 'email' && <LoginEmail />}
        {currentTab === 'sms' && <LoginSMS />}
        {currentTab === 'userName' && <LoginUserName />}
        <Divider sx={{ my: 2 }} />
        <Link href="/signup">
          <a className="text-DefaultTextColor hover:underline duration-150">
            Sign up
          </a>
        </Link>
        <Link href="/forgot-password">
          <a className="text-DefaultTextColor hover:underline duration-150 ">
            Forgot Password?
          </a>
        </Link>
      </div>
      <span className="mobileM:hidden laptopM:block">
        <LogoBigSize />
      </span>
      <div id="capcha_element_signin_with_phone"></div>
    </div>
  )
}

export default SignIn
