import { User, UserCredential } from "firebase/auth";
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import { database } from "../config/firebase-config";

type updateUserType ={
    writerId?:string,
    username:string,
    desc:string,
    image:string,
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

 const getWriter = async(user:User):Promise<updateUserType>=>{
    let writer = (await getDocs(query(dbInstance,where('userId','==',user.uid),limit(1)))).docs[0];
    return {...writer.data(),writerId:writer.id} as updateUserType;
}

export {updateUser,getWriter};

