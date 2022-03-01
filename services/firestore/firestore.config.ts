import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC5PPCu9ImHOtnHel4k3ZosxL-k14klX64',

  authDomain: 'expenses-tracker-firebase.firebaseapp.com',

  projectId: 'expenses-tracker-firebase',

  storageBucket: 'expenses-tracker-firebase.appspot.com',

  messagingSenderId: '203459084479',

  appId: '1:203459084479:web:6834c428b6f240ff63c60a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
