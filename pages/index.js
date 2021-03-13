import { useEffect, useState } from 'react'

import { firebaseCloudMessaging } from '../utils/webPush'
import 'firebase/messaging'
import firebase from 'firebase/app'

export default function Home() {

  const [tokenData, setTokenData] = useState('')

  useEffect(() => {
    setToken()
    // this is working
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
    // }
  })

  const setToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        setTokenData(token)
        getMessage()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMessage = async () => {
    const messaging = firebase.messaging()
    messaging.onMessage((message) => {
      console.log('foreground', message)
      alert(message.notification.body)
    })
  }


  return (
    <section>
      token: {tokenData}
    </section>
  )
}
