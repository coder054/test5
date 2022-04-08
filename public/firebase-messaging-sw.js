self.addEventListener('notificationclick', function (event) {
  console.log('aaa On notification click: ', event)

  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i]
          if (client.url == '/' && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/notifications')
        }
      })
  )
})

// const notiList = JSON.parse(await localforage.getItem('notiList')) || []
// const aa = JSON.stringify([...notiList, message])
// await localforage.setItem('notiList', aa)

importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.7/firebase-app-compat.min.js'
)
importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.7/firebase-messaging-compat.min.js'
)
importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js'
)

firebase.initializeApp({
  apiKey: 'AIzaSyD7JfGqgH_Y4opp0B7zgXEJe9FFa26phtE',
  projectId: 'zporter-dev',
  messagingSenderId: '357104839495',
  appId: '1:357104839495:web:924336770c1ea9b606fa62',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log(
    'aaa 3 [firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  // const notificationTitle = 'Background Message Title'
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: 'https://images.unsplash.com/photo-1645877409345-0389b63d382d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  // }

  // self.registration.showNotification(notificationTitle, notificationOptions)
})
