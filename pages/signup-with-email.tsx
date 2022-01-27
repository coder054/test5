import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import { SignUpWithEmail } from 'module/authen/signup/signup-with-email'
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
      <SignUpWithEmail />
    </LayoutLanding>
  )
}

export default SignUpPage
