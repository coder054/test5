import { initializeApp } from 'firebase/app'

const initFirebaseClient = () => {
  const firebaseConfigDev = {
    apiKey: 'AIzaSyD7JfGqgH_Y4opp0B7zgXEJe9FFa26phtE',
    authDomain: 'zporter-dev.firebaseapp.com',
    databaseURL:
      'https://zporter-dev-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'zporter-dev',
    storageBucket: 'zporter-dev.appspot.com',
    messagingSenderId: '357104839495',
    appId: '1:357104839495:web:924336770c1ea9b606fa62',
    measurementId: 'G-D7NS1ZG611',
  }

  const firebaseConfigStaging = {
    apiKey: 'AIzaSyB8Z2bCGsFd5gPkbBwf6Z5rykMAT8tG9kE',
    authDomain: 'zporter-bd622.firebaseapp.com',
    databaseURL:
      'https://zporter-bd622-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'zporter-bd622',
    storageBucket: 'zporter-bd622.appspot.com',
    messagingSenderId: '485466133501',
    appId: '1:485466133501:web:874ad874fd3bdef2553f94',
    measurementId: 'G-7K2ZDS00D2',
  }

  const firebaseConfig =
    process.env.NODE_ENV !== 'production'
      ? firebaseConfigDev
      : firebaseConfigStaging

  initializeApp(firebaseConfig)
}

// invoke this as soon as you can in the client app
export default initFirebaseClient
