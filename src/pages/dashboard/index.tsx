import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'

const Dashboard: NextPage = () => {
  const { playerProfile, coachProfile } = useAuth()
  const router = useRouter()

  // console.log('playerProfile', playerProfile.playerSkills.overall.technics)
  // console.log('coachProfile', coachProfile)

  // useEffect(() => {
  // if (!playerProfile.playerSkills.overall.technics) {
  // router.push(ROUTES.SIGNUP_FORM)
  // }
  // }, [playerProfile.playerSkills.overall.technics])

  return <h1 className="text-white">Dashboard</h1>
}

Dashboard.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}

export default Dashboard
