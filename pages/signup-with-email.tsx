import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { SignUpWithEmail } from 'module/authen/signup/signup-with-email'

const SignUpPage = () => {
  return (
    <LayoutLanding authen>
      <SignUpWithEmail />
    </LayoutLanding>
  )
}

export default SignUpPage
