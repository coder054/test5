import axiosLib from 'axios'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useAtom } from 'jotai'
import querystring from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { notificationsAtom } from 'src/atoms/notiAtoms'
import { firebaseApp } from 'src/config/firebase-client'
import { getStr } from 'src/utils/utils'

export const InitFCM = ({ token, currentRoleId }) => {
  const [list, setList] = useState([])
  const listRef = useRef(list)

  const [, setNotifications] = useAtom(notificationsAtom)

  useEffect(() => {
    listRef.current = list
  }, [list])

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      const initFirebaseFCM = (
        token,
        roleId,
        listRef,
        setList,
        setNotifications
      ) => {
        if (typeof window === 'undefined') {
          return
        }

        if (!token || !roleId) {
          return
        }

        /////// init noti handling
        ;(async (token, roleId) => {
          try {
            const firebaseMessaging = getMessaging(firebaseApp)
            // firebaseMessaging.getToken({vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE});
            // When you need to retrieve the current registration token for an app instance, call getToken. If notification permission has not been granted, this method will ask the user for notification permissions. Otherwise, it returns a token or rejects the promise due to an error.

            const currentToken = await getToken(firebaseMessaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE,
            })

            if (!currentToken) {
              return
            }

            const axios = axiosLib.create({
              baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
              headers: {
                'X-Frame-Options': 'SAMEORIGIN',
                'Content-type': 'application/json',
                'XSRF-TOKEN': 'csrfToken',
              },
              paramsSerializer: (param) => querystring.stringify(param),
            })

            //@ts-ignore: Unreachable code error
            axios.defaults.headers.roleId = roleId

            //@ts-ignore: Unreachable code error
            axios.defaults.headers.common.Authorization = `Bearer ${token}`

            await axios.post('/notifications/create-fcm-token', {
              token: currentToken,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })

            // Send the token to your server and update the UI if necessary

            onMessage(firebaseMessaging, async (payload) => {
              setList([...listRef.current, payload])
              setNotifications((prev) => {
                return [payload.data, ...prev]
              })

              toast(
                (t) => (
                  <div className="w-[400px] flex gap-x-[8px] ">
                    <img
                      src={getStr(payload, 'data.largeIcon')}
                      className="w-[50px] h-[50px] "
                      alt=""
                    />

                    <div className=" ">
                      <div className="text-[14px] max-w-[260px]  ">
                        {getStr(payload, 'data.title')}
                      </div>
                      <div className="text-[14px] whitespace-normal  max-w-[260px] ">
                        {getStr(payload, 'data.body')}
                      </div>
                    </div>
                  </div>
                ),
                {
                  duration: 4000,
                  position: 'bottom-left',
                  // Styling
                  style: {},
                  className: '',
                  // Custom Icon
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  // Change colors of success/error/loading icon
                  iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                  },
                  // Aria
                  ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                  },
                }
              )
            })
          } catch (_error) {
            return
          }
        })(token, roleId)
      }
      initFirebaseFCM(token, currentRoleId, listRef, setList, setNotifications)
    }
  }, [currentRoleId, token])

  return (
    <>
      <Toaster />
    </>
  )
}
