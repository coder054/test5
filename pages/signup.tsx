import { LayoutLanding } from 'components/layout-landing/layout-landing'
import SignUp from 'module/authen/signup'

const SignUpPage = () => {
  return (
    <LayoutLanding authen>
      <SignUp />
    </LayoutLanding>
  )
}

export default SignUpPage
