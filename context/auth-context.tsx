import { createContext,useContext } from "react";



const authContext = createContext({});


export function useAuth () {
  return (useContext(authContext));
}

export function AuthProvider({children}:{children:JSX.Element}){

}
