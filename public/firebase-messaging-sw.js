importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyBTomKe23wQ7C0VpqRoDfM4tTHS091VDN0",
    authDomain: "mresta-acf9a.firebaseapp.com",
    projectId: "mresta-acf9a",
    storageBucket: "mresta-acf9a.appspot.com",
    messagingSenderId: "598440874412",
    appId: "1:598440874412:web:34bd76ec5da793a0956a09",
    measurementId: "G-GV5B6LYL2D"
})

const messaging = firebase.messaging()

// Both of them ain't working

//background notifications will be received here
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    // Customize notification here
    const notificationTitle = 'Background Message Title'
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    }

    return self.registration.showNotification(notificationTitle, notificationOptions)
})

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload)
    const notificationTitle = 'Background Message Title'
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    }

    return self.registration.showNotification(notificationTitle, notificationOptions)
})