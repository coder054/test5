import axiosLib from 'axios'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getStorage } from 'firebase/storage'
import querystring from 'query-string'
import toast from 'react-hot-toast'
import { getStr } from 'src/utils/utils'

export const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MEASUREMENT_ID,
})

export const initFirebaseFCM = (
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

export const storage = getStorage()

// invoke this as soon as you can in the client app
// export default initFirebaseClient
export const auth = getAuth(firebaseApp)
// export default firebase
