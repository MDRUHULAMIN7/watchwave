import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";




export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const auth=getAuth(app)
const googleProvider = new GoogleAuthProvider()
    const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const axiosPublic = UseAxiosPublic()
const googleSigin=()=>{
    setLoading(true)
  return signInWithPopup(auth,googleProvider)
}


const createUser=(email,password)=>{
    setLoading(true)
  return  createUserWithEmailAndPassword(auth,email,password)
}
const updateuserprofile=(name,photo)=>{
 return   updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
}


const signInUser=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password);
}

const logout=()=>{
    setLoading(true)
    return signOut(auth);
   
}

useEffect(()=>{

    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser);
        console.log('effeect',currentUser);

        setLoading(false)
    });
    return ()=>{
        unsubscribe();
    }
},[auth,axiosPublic])
    const authInfo={
        user,setUser,loading,setLoading,
        createUser,signInUser,logout,updateuserprofile,googleSigin
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;