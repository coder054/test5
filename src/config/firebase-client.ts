import { getStorage } from 'firebase/storage'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

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

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MEASUREMENT_ID,
})

console.log('aaa initializeApp')

export const storage = getStorage()

// invoke this as soon as you can in the client app
// export default initFirebaseClient
export const auth = getAuth(firebaseApp)
// export default firebase
