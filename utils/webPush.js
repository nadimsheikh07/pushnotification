import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token')
    },
    //initializing firebase app
    init: async function () {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBTomKe23wQ7C0VpqRoDfM4tTHS091VDN0",
                authDomain: "mresta-acf9a.firebaseapp.com",
                projectId: "mresta-acf9a",
                storageBucket: "mresta-acf9a.appspot.com",
                messagingSenderId: "598440874412",
                appId: "1:598440874412:web:34bd76ec5da793a0956a09",
                measurementId: "G-GV5B6LYL2D"
            })

            try {
                const messaging = firebase.messaging()
                const tokenInLocalForage = await this.tokenInlocalforage()
                //if FCM token is already there just return the token
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage
                }
                //requesting notification permission from browser
                const status = await Notification.requestPermission()
                if (status && status === 'granted') {
                    //getting token from FCM
                    const fcm_token = await messaging.getToken({
                        vapidKey: 'BA8cT1CKzJr3ZonJN2woBj4AKtPxfp7OklLdIgcwUSg_3TXtfEnHeZ4P_agg3clsXQrTqB50pzi6Wv7fRvbv1So'
                    })
                    if (fcm_token) {
                        //setting FCM token in indexed db using localforage
                        localforage.setItem('fcm_token', fcm_token)
                        console.log('fcm token', fcm_token)
                        //return the FCM token after saving it
                        return fcm_token
                    }
                }
            } catch (error) {
                console.error(error)
                return null
            }
        }
    }
}
export { firebaseCloudMessaging }