import {initializeApp} from 'firebase/app'
import 
{
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import 
{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDs5WE7uZKicqheJawBSh4jB5KvPeFwXAU",
  authDomain: "crwn-db-16569.firebaseapp.com",
  projectId: "crwn-db-16569",
  storageBucket: "crwn-db-16569.appspot.com",
  messagingSenderId: "486754681208",
  appId: "1:486754681208:web:d9143456a772b6c1e5c88d",
  measurementId: "G-406XTDVL19"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(firebaseApp);

provider.setCustomParameters({
  prompt:'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInfo)=>{
  const userDocRef = doc(db,'users',userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName,email } = userAuth;
    const createdAt = new Date();

    try
    {
      await setDoc(userDocRef,{displayName,email,createdAt,...additionalInfo});
    }
    catch(error)
    {
      console.log('error creating the user',error)
    }
  }
}

export const createAuthUserWithEmailAndPassword = (email, password)=>{
  if(!email||!password) return

  return createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = (email, password)=>{
  if(!email||!password) return

  return signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async()=>{
  await signOut(auth);
}

export const onAuthStateChangedListener = (callback)=>{onAuthStateChanged(auth,callback);}