import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAdXVAOgsr3pyT030CF5u7Ymu-iaqhTFdM",
  authDomain: "nirvana-collections-backend.firebaseapp.com",
  projectId: "nirvana-collections-backend",
  storageBucket: "nirvana-collections-backend.appspot.com",
  messagingSenderId: "497296666956",
  appId: "1:497296666956:web:b7819edcaee2ea2c855fe9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const imageDb = getStorage(app); 
export default app; 