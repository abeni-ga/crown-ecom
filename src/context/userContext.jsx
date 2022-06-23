import { createContext, useEffect,useReducer } from "react";

import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser:null,
  setCurrentUser: ()=>null
})

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}



export const UserProvider = ({children})=>{
  // const [currentUser,setCurrentUser]= useState(null);

  const userReducer = (state,action)=>{
    const {type,payload} = action;

    switch(type){
      case USER_ACTION_TYPE.SET_CURRENT_USER:
        return{
          ...state,
          currentUser:payload,
        }
      default:
        throw new Error(`UNHANLED USER ACTION TYPE ${type}`)
    }
  }

  const INITIAL_STATE = {
    currentUser:null
  }

  const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_STATE);

  const setCurrentUser = (user)=>{
    dispatch({type:USER_ACTION_TYPE.SET_CURRENT_USER,payload:user})
  }

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