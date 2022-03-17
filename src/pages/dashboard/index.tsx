import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/constants'
import { axios } from 'src/utils/axios'
import { API_GET_USER_ROLES } from 'src/constants/api.constants'

const Dashboard: NextPage = () => {
  const router = useRouter()

  // handle at AuthContext
  // useEffect(() => {
  //   const getUserRole = async () => {
  //     const resp = await axios.get(API_GET_USER_ROLES)
  //     if (!resp.data[0].role) {
  //       router.push(ROUTES.SIGNUP_FORM)
  //     }
  //   }
  //   getUserRole()
  // }, [])

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
