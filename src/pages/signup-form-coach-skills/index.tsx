import { LayoutSignupForm } from 'src/components/layout-signup-form'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { SignUpFormCoachSkills } from 'src/module/authen/signup-form-coach-skills'

const SignUpFormCoachSkillsPage = () => {
  const router = useRouter()
  return (
    <AuthGuard>
      <LayoutSignupForm coachSkill>
        <Head>
          <title>Zporter signup form coach skills</title>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <SignUpFormCoachSkills />
      </LayoutSignupForm>
    </AuthGuard>
  )
}

export default SignUpFormCoachSkillsPage
