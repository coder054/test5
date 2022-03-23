import { FC, ReactNode, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { get, isEmpty, size } from 'lodash'
import { ROUTES } from 'src/constants/constants'
import { AlertUpdateProfile } from '../common/AlertUpdateProfile'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props
  const { authenticated, userRoles } = useAuth()

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
      if (!router.isReady) {
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
    [router.isReady, authenticated, isRoleNull]
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
