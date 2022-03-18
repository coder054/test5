import { useEffect } from 'react'
import { getMessaging, onMessage } from 'firebase/messaging'

import { getToken } from 'firebase/messaging'
import { firebaseApp } from 'src/config/firebase-client'

export default function () {
  useEffect(() => {
    console.log('aaa1')
    // Initialize Firebase Cloud Messaging and get a reference to the service
    const firebaseMessaging = getMessaging(firebaseApp)
    console.log('aaa2')
    // firebaseMessaging.getToken({vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE});
    // When you need to retrieve the current registration token for an app instance, call getToken. If notification permission has not been granted, this method will ask the user for notification permissions. Otherwise, it returns a token or rejects the promise due to an error.

    getToken(firebaseMessaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_CERTIFICATE,
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          )
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        // ...
      })

    onMessage(firebaseMessaging, (payload) => {
      alert(1)
      console.log('Message received. ', payload)
      // ...
    })
  }, [])

  return <div className="text-red-400 ">testFCM</div>
}
