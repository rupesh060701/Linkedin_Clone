import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCzqoDyoElI4GH51zG_KMuLMnzvFqh787g",
  authDomain: "linkedin-clone-94e4d.firebaseapp.com",
  projectId: "linkedin-clone-94e4d",
  storageBucket: "linkedin-clone-94e4d.appspot.com",
  messagingSenderId: "639561274020",
  appId: "1:639561274020:web:7e6bc082f7831cc7f1cc31",
  measurementId: "G-2SMB41J4TL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage,signInWithPopup };
export default db;
