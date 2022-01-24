import { LayoutLanding } from 'components/layout-landing/layout-landing'
import { SignUpWithSMS } from 'module/authen/signup/signup-with-sms'

const SignUpPage = () => {
  return (
    <LayoutLanding authen>
      <SignUpWithSMS />
    </LayoutLanding>
  )
}

export default SignUpPage
