import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { API_PLAYER_PROFILE } from 'src/constants/api.constants'

const Dashboard: NextPage = () => {
  const { userRoles } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!userRoles[0]?.role) {
      router.push(ROUTES.SIGNUP_FORM)
    }
  }, [!userRoles[0]?.role])

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
