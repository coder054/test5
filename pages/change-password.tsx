import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import ChangePassword from 'module/authen/change-password'
import { useRouter } from 'next/router'

const OtpCodePage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutLanding>
      <ChangePassword />
    </LayoutLanding>
  )
}

export default OtpCodePage
