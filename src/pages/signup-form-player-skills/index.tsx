import { LayoutSignupForm } from 'src/components/layout-signup-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { SignUpFormPlayerSkills } from 'src/module/authen/signup-form-player-skills'

const SignUpFormPlayerSkillsPage = () => {
  const router = useRouter()
  return (
    <AuthGuard>
      <LayoutSignupForm playerSkill>
        <Head>
          <title>Zporter signup form player skills</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignUpFormPlayerSkills />
      </LayoutSignupForm>
    </AuthGuard>
  )
}

export default SignUpFormPlayerSkillsPage
