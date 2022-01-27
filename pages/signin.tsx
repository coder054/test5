import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { useAuth } from 'module/authen/auth/AuthContext'
import SignIn from 'module/authen/singin'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  if (!!currentUser) {
    router.push('/feed')
    return null
  }
  return (
    <LayoutLanding authen>
      <SignIn />
    </LayoutLanding>
  )
}

export default SignInPage
