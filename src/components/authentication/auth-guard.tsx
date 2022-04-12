import { get, isEmpty, size } from 'lodash'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { AlertUpdateProfile } from '../common/AlertUpdateProfile'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props
  const { authenticated, userRoles, initialized, updatingAuthInfo } = useAuth()

  const router = useRouter()
  const [checked, setChecked] = useState(false)

  const isRoleNull = useMemo(() => {
    return (
      isEmpty(userRoles) ||
      (size(userRoles) === 1 && get(userRoles, '[0].role') === null)
    )
  }, [userRoles])

  useEffect(
    () => {
      if (!router.isReady || !initialized || updatingAuthInfo === true) {
        return
      }

      if (!authenticated) {
        router.push({
          // pathname: '/authentication/login',
          pathname: '/signin',
          // query: { returnUrl: router.asPath },
        })
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
  // authenticated / authorized.

  return (
    <>
      {children}
      <AlertUpdateProfile isRoleNull={isRoleNull} />
    </>
  )
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}
