import React from 'react';
import '../styles/globals.css'
import { firebaseCloudMessaging, onMessageListener } from '../firebase';
import "firebase/messaging";
import firebase from 'firebase/app';


function MyApp({ Component, pageProps }) {


  const setToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init();
      if (token) {
        console.log('token', token);
      }
    } catch (error) {
      console.log(error);
    }
  }



  React.useEffect(() => {

    // add serviceWorker
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', function () {
    //     navigator.serviceWorker.getRegistrations().then(registrations => {
    //       for (let registration of registrations) {
    //         registration.unregister().then(bool => { console.log('unregister: ', bool); });
    //       }
    //     });
    //   });
    // }
    setToken()


  }, [])


  onMessageListener().then(payload => {
    console.log('onMessageListener', payload);
  }).catch(err => console.log('failed: ', err));


  return <Component {...pageProps} />
}

export default MyApp
