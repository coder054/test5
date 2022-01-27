import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import { SignUpWithSMS } from 'module/authen/signup/signup-with-sms'
import { useRouter } from 'next/router'

const SignUpPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutLanding authen>
      <SignUpWithSMS />
    </LayoutLanding>
  )
}

export default SignUpPage
