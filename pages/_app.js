import React, { useEffect } from 'react';
import '../styles/globals.css'
import firebase from 'firebase/app'
import { firebaseCloudMessaging } from '../utils/webPush'

function MyApp({ Component, pageProps }) {


  useEffect(() => {
    setToken()
    // this is working
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    }
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init()
        if (token) {
          console.log('token', token)
          // not working
          getMessage()
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  function getMessage() {
    console.log('message functions')
    const messaging = firebase.messaging()
    messaging.onMessage((message) => console.log('foreground', message))
  }

  return <Component {...pageProps} />
}

export default MyApp
