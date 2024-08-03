import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyAkdlykY-zUTXxoWzcLHVTQlGgKrusFaz0",
  authDomain: "linkedin-clone-f2ab6.firebaseapp.com",
  projectId: "linkedin-clone-f2ab6",
  storageBucket: "linkedin-clone-f2ab6.appspot.com",
  messagingSenderId: "866736504041",
  appId: "1:866736504041:web:ca3a0793b699d2fa6f8478",
  measurementId: "G-HKLPBGE090"
};
 

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage,signInWithPopup };
export default db;
