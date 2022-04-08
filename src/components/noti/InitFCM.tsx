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
import { useAtom } from 'jotai'
import { notificationsAtom } from 'src/atoms/notiAtoms'
const Alert = React.forwardRef(function Alert(props, ref) {
  //@ts-ignore: Unreachable code error
  return <div className="border p-6 ">haha</div>
})

export const InitFCM = ({ token, currentRoleId }) => {
  const [currentNotiItem, setCurrentNotiItem] = useState(null)
  const [list, setList] = useState([])
  const listRef = useRef(list)

  const [notifications, setNotifications] = useAtom(notificationsAtom)

  useEffect(() => {
    listRef.current = list
  }, [list])

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      const callback = toast.custom.bind(null, (t, aaa) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great! {aaa}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))

      initFirebaseFCM(
        token,
        currentRoleId,
        listRef,
        setList,
        setNotifications,
        callback
      )
    }
  }, [currentRoleId, token])

  useEffect(() => {
    console.log('aaa notifications1: ', notifications)
  }, [notifications])

  useEffect(() => {
    console.log('aaa list: ', list)
  }, [list])

  useEffect(() => {
    const interval = setInterval(async () => {
      return
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
