import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'

const Dashboard: NextPage = () => {
  const { playerProfile, coachProfile, userRoles } = useAuth()
  const router = useRouter()

  // console.log('playerProfile', playerProfile.playerSkills.overall.technics)
  // console.log('coachProfile', coachProfile)
  console.log('userRoles', userRoles)

  useEffect(() => {
    if (!userRoles[0].role) {
      router.push(ROUTES.SIGNUP_FORM)
    }
  }, [userRoles[0].role])

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
