import { LayoutSignupForm } from 'src/components/layout-signup-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { SignupFormBiography } from 'src/module/authen/signup-form-biography'

const SignUpFormBiographyPage = () => {
  const router = useRouter()
  return (
    <AuthGuard>
      <LayoutSignupForm biography>
        <Head>
          <title>Zporter signup form biography</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignupFormBiography />
      </LayoutSignupForm>
    </AuthGuard>
  )
}

export default SignUpFormBiographyPage
