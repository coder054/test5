importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyD7JfGqgH_Y4opp0B7zgXEJe9FFa26phtE',
  projectId: 'zporter-dev',
  messagingSenderId: '357104839495',
  appId: '1:357104839495:web:924336770c1ea9b606fa62',
})
const messaging = firebase.messaging()
// Optional:
messaging.onBackgroundMessage((message) => {
  console.log("aaa onBackgroundMessage", message);
});
