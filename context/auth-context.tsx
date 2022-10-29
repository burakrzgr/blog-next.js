import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { auth } from "../config/firebase-config";

const authContext = createContext({});

export function useAuth() {
    return useContext(authContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const userRef = useRef();

    function signup(email: string, pasword: string) {
        createUserWithEmailAndPassword(auth, email, pasword);
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
}
