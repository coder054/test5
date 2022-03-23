import { Button, Dialog, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { signingOutAtom } from 'src/atoms/UIAtoms'
import { ROUTES } from 'src/constants/constants'
import { useDebounce } from 'use-debounce'

export const AlertUpdateProfile = ({ isRoleNull }) => {
  const [signingOut, setSigningOut] = useAtom(signingOutAtom)
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [isRouteUpdateProfile, setIsRouteUpdateProfile] = useState(false)

  useEffect(() => {
    const path = get(router, 'asPath')
    if (path.includes('/signup-form')) {
      setIsRouteUpdateProfile(true)
    } else {
      setIsRouteUpdateProfile(false)
    }
    console.log('aaa path', path)
  }, [get(router, 'asPath')])

  const open2 = useMemo(() => {
    return open && isRouteUpdateProfile === false && isRoleNull === true
  }, [open, isRouteUpdateProfile, isRoleNull])

  const [openDebounced] = useDebounce(open2, 3000)

  if (signingOut) {
    return null
  }

  return (
    <div className=" ">
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open && isRouteUpdateProfile === false && isRoleNull === true}
      >
        <div className="p-[16px] ">
          <div className=" ">
            <Typography variant="h6">Zporter</Typography>
          </div>
          <div className="text-center mt-[38px] ">
            <Typography variant="body1">
              You need to update your profile
            </Typography>
          </div>
          <div className="text-center mt-[38px] ">
            <Button
              onClick={() => {
                router.push(ROUTES.SIGNUP_FORM)
              }}
              variant="outlined"
            >
              Ok
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
