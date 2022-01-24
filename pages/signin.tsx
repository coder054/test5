import { LayoutLanding } from 'components/layout-landing/layout-landing'
import SignIn from 'module/authen/singin'

const SignInPage = () => {
  return (
    <LayoutLanding authen>
      <SignIn />
    </LayoutLanding>
  )
}

export default SignInPage
