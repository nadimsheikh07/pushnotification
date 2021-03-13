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
                apiKey: "AIzaSyD0iS_sIuNj91RN104PZJ0h_dpXAihymOA",
                authDomain: "fir-push-5f4c6.firebaseapp.com",
                projectId: "fir-push-5f4c6",
                storageBucket: "fir-push-5f4c6.appspot.com",
                messagingSenderId: "930496129085",
                appId: "1:930496129085:web:88eb3786e23365ce5f6254"
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
                        vapidKey: 'BMiLid77LEM6mfrTf2_6RcZrGZj_HGvGbryyjlHlfxTCzDZd6gwpiPAnzD23OBMa6ttDLPgmyK_AXym5HQ6qvBM'
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