importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyD0iS_sIuNj91RN104PZJ0h_dpXAihymOA",
    authDomain: "fir-push-5f4c6.firebaseapp.com",
    projectId: "fir-push-5f4c6",
    storageBucket: "fir-push-5f4c6.appspot.com",
    messagingSenderId: "930496129085",
    appId: "1:930496129085:web:88eb3786e23365ce5f6254"
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