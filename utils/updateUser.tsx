import { User, UserCredential } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/firebase-config";

type updateUserType ={
    username:string,
    desc:string,
    link:string,
    userId:string,
    interests:string,
    blogs:string[]
}

const dbInstance = collection(database, 'writers');



const updateUser = (user:User,updateInfo:updateUserType)=>{
    addDoc(dbInstance,
        updateInfo
    );

}

export default updateUser;

