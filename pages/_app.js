import React from 'react';
import '../styles/globals.css'
import { firebaseCloudMessaging } from '../firebase';
import firebase from 'firebase/app';


function MyApp({ Component, pageProps }) {


  const setToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        console.log('token', token);
        getMessage();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMessage = () => {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      const { title, body } = JSON.parse(message.data.notification);
      var options = {
        body,
      };      
      self.registration.showNotification(title, options);
    });
  }

  React.useEffect(() => {

    // add serviceWorker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let registration of registrations) {
            registration.unregister().then(bool => { console.log('unregister: ', bool); });
          }
        });
      });
    }

    setToken()

  }, [])


  return <Component {...pageProps} />
}

export default MyApp
