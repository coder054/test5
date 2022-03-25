import { get, isEmpty, size } from 'lodash'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import type { FC, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ROUTES } from 'src/constants/constants'
import { useAuth } from 'src/module/authen/auth/AuthContext'

interface GuestGuardProps {
  children: ReactNode
}

export const GuestGuard: FC<GuestGuardProps> = (props) => {
  const { children } = props
  const { authenticated, userRoles, initialized, updatingAuthInfo } = useAuth()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  const isRoleNull = useMemo(() => {
    return (
      isEmpty(userRoles) ||
      (size(userRoles) === 1 && !get(userRoles, '[0].role'))
    )
  }, [userRoles])

  useEffect(
    () => {
      if (!router.isReady || !initialized || updatingAuthInfo === true) {
        return
      }

      // You should remove the "disableGuard" check, because it's meant to be used only in the demo.
      if (authenticated && isRoleNull) {
        router.push(ROUTES.UPDATE_PROFILE)
        return null
      } else if (authenticated && !isRoleNull) {
        router.push('/dashboard')
        return null
      } else {
        setChecked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, authenticated, isRoleNull, initialized, updatingAuthInfo]
  )

  if (!checked) {
    return null
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // not authenticated / authorized.

  return <>{children}</>
}

GuestGuard.propTypes = {
  children: PropTypes.node,
}
