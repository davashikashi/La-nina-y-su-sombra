
import { createContext, useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const authContext = createContext(); 

export const useAuth = () => {
        const context = useContext(authContext)
        if (!context){
            console.error("Error creating auth context");
            return
        }
        return context;
}

export default function AuthProvider({ children }){
    const [userLogged, setUserLogged] = useState(null)

    useEffect(() =>{
        const susbscribed = onAuthStateChanged(auth, (currentUser) =>{
            !currentUser ? setUserLogged(null) : setUserLogged(currentUser)
        })

        return () => susbscribed()
    }, [])

    const loginWithinGoogle = async () => {
        try{
            const provider = new  GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            return {success: true, user: res.user};
        } catch (error) {
            return {success: false, error: error}
        }
    }

    const logout = async () => {
        try{
            await signOut(auth)
            return {success: true}
        } catch(error){
            return { success: false, error: error}

        }
    }

    return (
        <authContext.Provider value = {{userLogged, loginWithinGoogle}}>
            {children}
        </authContext.Provider>
    )
}