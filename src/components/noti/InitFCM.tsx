import { unmountComponentAtNode } from 'react-dom'
import * as localforage from 'localforage'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { notiToast } from 'src/components/common/Toast'
import { initFirebaseFCM } from 'src/config/firebase-client'
import { getErrorMessage } from 'src/utils/utils'
import React from 'react'
import { ItemNotification } from '../dashboard/notifications-popover'
import toast, { Toaster } from 'react-hot-toast'
import { checkNotification } from 'src/service/notiService'
import { axios } from 'src/utils/axios'
const Alert = React.forwardRef(function Alert(props, ref) {
  //@ts-ignore: Unreachable code error
  return <div className="border p-6 ">haha</div>
})

export const InitFCM = ({ token, currentRoleId }) => {
  const [currentNotiItem, setCurrentNotiItem] = useState(null)
  const [list, setList] = useState([])
  const listRef = useRef(list)

  useEffect(() => {
    listRef.current = list
  }, [list])

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      initFirebaseFCM(token, currentRoleId, listRef, setList)
    }
  }, [currentRoleId, token])

  useEffect(() => {
    console.log('aaa list: ', list)
  }, [list])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!window.document.hasFocus()) {
          return
        }

        if (isEmpty(listRef.current)) {
          return
        }
        setCurrentNotiItem(null)
        const last = listRef.current[listRef.current.length - 1]
        const first = listRef.current[0]
        const noLast = listRef.current.slice(0, listRef.current.length - 1)

        const noFirst = listRef.current.slice(1, listRef.current.length)

        setCurrentNotiItem(first)

        //@ts-ignore: Unreachable code error

        toast.custom(
          (t) => {
            return (
              <div className="w-[380px] sm:w-[460px] ">
                <ItemNotification
                  notification={first.data}
                  handleClickOne={async () => {
                    await checkNotification(first.data.notificationId)
                    toast.dismiss(t.id)
                  }}
                  handleRemoveOne={async () => {
                    try {
                      await axios.delete(
                        `/notifications/delete-notification?notificationId=${first.data.notificationId}`
                      )
                      toast.dismiss(t.id)
                    } catch (error) {
                      notiToast({
                        message: getErrorMessage(error),
                        type: 'error',
                      })
                    }
                  }}
                  onClose={() => {
                    toast.dismiss(t.id)
                  }}
                ></ItemNotification>
              </div>
            )
          },
          {
            icon: null,
            duration: 4000,
            position: 'bottom-left',
          }
        )
        // toast('cusseess')

        console.log('aaa first', first)

        setList(noFirst)
      } catch (error) {
        notiToast({
          message: getErrorMessage(error),
          type: 'error',
        })
      }
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setCurrentNotiItem(null)
  }

  return (
    <>
      <Toaster />
    </>
  )
}
