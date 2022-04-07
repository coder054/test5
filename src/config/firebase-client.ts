import * as localforage from 'localforage'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getErrorMessage, parseCookies } from 'src/utils/utils'
import { axios } from 'src/utils/axios'
import { COOKIE_KEY } from 'src/constants/constants'

// const initFirebaseClient = () => {
//   const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MEASUREMENT_ID,
//   }

//   initializeApp(firebaseConfig)
// }

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

export const initFirebaseFCM = (token, roleId) => {
  if (typeof window === 'undefined') {
    return
  }
  console.log('aaa haha')
  if (!token || !roleId) {
    console.log('aaa no token or no roleId')
    return
  }

  const foo = async () => {
    try {
      const firebaseMessaging = getMessaging(firebaseApp)
      // firebaseMessaging.getToken({vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE});
      // When you need to retrieve the current registration token for an app instance, call getToken. If notification permission has not been granted, this method will ask the user for notification permissions. Otherwise, it returns a token or rejects the promise due to an error.

      const currentToken = await getToken(firebaseMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE,
      })

      if (!currentToken) {
        console.log(
          'aaa No registration token available. Request permission to generate one.'
        )
        return
      }

      console.log('aaa currentToken', currentToken)

      const { data } = await axios.post('/notifications/create-fcm-token', {
        token: currentToken,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
      console.log('aaa complete init fcm')

      // Send the token to your server and update the UI if necessary

      onMessage(firebaseMessaging, async (payload) => {
        console.log('aaa Message received. ', payload)
        const notiList = JSON.parse(await localforage.getItem('notiList')) || []
        await localforage.setItem(
          'notiList',
          JSON.stringify([...notiList, payload])
        )
        // ...
      })
    } catch (error) {
      alert(getErrorMessage(error))
    }
  }

  foo()
}

console.log('aaa initializeApp')

export const storage = getStorage()

// invoke this as soon as you can in the client app
// export default initFirebaseClient
export const auth = getAuth(firebaseApp)
// export default firebase
