importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');

/**
 * Initialize the Firebase app in the service worker by passing in the
 * [messagingSenderId]
 */

firebase.initializeApp({
    apiKey: "AIzaSyBTomKe23wQ7C0VpqRoDfM4tTHS091VDN0",
    // authDomain: "mresta-acf9a.firebaseapp.com",
    projectId: "mresta-acf9a",
    storageBucket: "mresta-acf9a.appspot.com",
    messagingSenderId: "598440874412",
    appId: "1:598440874412:web:34bd76ec5da793a0956a09",
    measurementId: "G-GV5B6LYL2D"
});

/**
 * define message const
 */

const messaging = firebase.messaging();

/**
 * --- Installs service worker ---
 */

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});





/**
 * --- user click notification ---
 * --- get notification object ---
 * use event.notification.data
 */

self.addEventListener('notificationclick', (event) => {
    // Event actions derived from event.notification.data from data received
    var eventURL = event.notification.data;
    event.notification.close();
    if (event.action === 'confirmAttendance') {
        clients.openWindow(eventURL.confirm);
    } else if (event.action === 'cancel') {
        clients.openWindow(eventURL.decline);
    } else {
        clients.openWindow(eventURL.open);
    }
}, false);

/**
 * --- received message(Background) ---
 * [CUSTOM] dont put notification element in payload
 * --- payload must be like this ---
 * payload : {
 *  data: {
 *    ...
 *    notification: {
 *      title: ''
 *      body: ''
 *    }
 *    ...
 *  }
 * }
 */

messaging.onMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received message ', payload);

    let data = JSON.parse(payload.data.custom_notification);
    let notificationTitle = data.title;
    let notificationOptions = {
        body: data.body,
        icon: 'https://image.flaticon.com/icons/png/128/107/107822.png',
        // options event
        actions: [
            { action: 'confirmAttendance', title: '👍 Confirm attendance' },
            { action: 'cancel', title: '👎 Not coming' }
        ],
        // For additional data to be sent to event listeners, needs to be set in this data {}
        data: { confirm: data.confirm, decline: data.decline, open: data.open }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    let data = JSON.parse(payload.data.custom_notification);
    let notificationTitle = data.title;
    let notificationOptions = {
        body: data.body,
        icon: 'https://image.flaticon.com/icons/png/128/107/107822.png',
        // options event
        actions: [
            { action: 'confirmAttendance', title: '👍 Confirm attendance' },
            { action: 'cancel', title: '👎 Not coming' }
        ],
        // For additional data to be sent to event listeners, needs to be set in this data {}
        data: { confirm: data.confirm, decline: data.decline, open: data.open }
    };    
    return self.registration.showNotification(notificationTitle, notificationOptions);
});