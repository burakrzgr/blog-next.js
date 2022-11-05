import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { auth } from "../config/firebase-config";
import updateUser from "../utils/updateUser";


interface AuthProviderInterface {
    signup: Function;
    login: Function;
    logout: Function;
    user?: any;
  }


const AuthContext = createContext<AuthProviderInterface>({login:() => {},logout:() => {},signup:() => {},user:null});;

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element })  {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const userRef = useRef();

    function signup(email: string, pasword: string, username:string) {
        return createUserWithEmailAndPassword(auth, email, pasword).then((user) => {
            updateUser(user.user,{
              username: username,
              userId:user.user.uid,
              desc:'',
              link:'',
              interests:'',
              blogs:[]
            });
        });
    }    
    function login(email: string, pasword: string) {
        return signInWithEmailAndPassword(auth, email, pasword);
    }
    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user??{});
            setLoading(false);
        });
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
