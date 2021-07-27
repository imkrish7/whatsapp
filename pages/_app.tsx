import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import type { AppProps } from 'next/app'
import Loading from '../components/Loading';
import { useEffect } from 'react';
import Login from "./Login";
import firebase from 'firebase';

function MyApp({ Component, pageProps }: AppProps) {

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
      if(user){
        db.collection('users').doc(user.uid).set({
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL
        },
        {merge: true}
        )
      }
    // return () => {
    //   // cleanup
    // }
  }, [user])

  if(loading) return <Loading />
  
  if (!user) return <Login />
  return <Component {...pageProps} />
}
export default MyApp


