import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { auth } from "../config/firebase-config";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const userRef = useRef();

    function signup(email: string, pasword: string) {
        createUserWithEmailAndPassword(auth, email, pasword);
    }    
    function login(email: string, pasword: string) {
        signInWithEmailAndPassword(auth, email, pasword);
    }
    function logout() {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {});
            setUser(user);
            setLoading(false);
        return unsubscribe;
    }, []);

    const authValue = {
        user,
        login,
        signup,
        logout,
        userRef
    };

    return(
        <AuthContext.Provider value={authValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
