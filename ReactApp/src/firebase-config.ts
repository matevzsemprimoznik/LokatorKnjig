import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCwIzztbaTfbhP9BSrLrC4EgakeVwkEVUI',
  authDomain: 'lokator-knjig.firebaseapp.com',
  projectId: 'lokator-knjig',
  storageBucket: 'lokator-knjig.appspot.com',
  messagingSenderId: '413382940914',
  appId: '1:413382940914:web:70f582239eb4edb10cd86b',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
