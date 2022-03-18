import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

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

// if (false) {
  
//   const firebaseMessaging = getMessaging(firebaseApp)
//   console.log('aaa2')
//   // firebaseMessaging.getToken({vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE});
//   // When you need to retrieve the current registration token for an app instance, call getToken. If notification permission has not been granted, this method will ask the user for notification permissions. Otherwise, it returns a token or rejects the promise due to an error.

//   getToken(firebaseMessaging, {
//     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE,
//   })
//     .then((currentToken) => {
//       if (currentToken) {
//         debugger
//         // Send the token to your server and update the UI if necessary
//         // ...
//       } else {
//         // Show permission request UI
//         console.log(
//           'No registration token available. Request permission to generate one.'
//         )
//         // ...
//       }
//     })
//     .catch((err) => {
//       debugger
//       console.log('An error occurred while retrieving token. ', err)
//       // ...
//     })

//   onMessage(firebaseMessaging, (payload) => {
//     console.log('aaa Message received. ', payload)
//     // ...
//   })
// }

console.log('aaa initializeApp')

export const storage = getStorage()

// invoke this as soon as you can in the client app
// export default initFirebaseClient
export const auth = getAuth(firebaseApp)
// export default firebase
