import { LayoutSignupForm } from 'src/components/layout-update-profile'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { SignUpFormPlayerSkills } from 'src/modules/authentication/update-profile-player-skills'

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
