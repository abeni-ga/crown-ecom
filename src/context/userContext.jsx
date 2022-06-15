import { createContext, useState,useEffect } from "react";

import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser:null,
  setCurrentUser: ()=>null
})


export const UserProvider = ({children})=>{
  const [currentUser,setCurrentUser]= useState(null);
  const value = {currentUser,setCurrentUser}
  useEffect(()=>{
    const unsubcribe=onAuthStateChangedListener(async(user)=>{
      console.log('currentUser:',user)
      if(user){
        await createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubcribe;
  },[])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}