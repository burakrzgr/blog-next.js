import { User, UserCredential } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, where } from "firebase/firestore";
import { database } from "../config/firebase-config";
import { useAuth } from "../context/auth-context";

type favInfo ={
    follower:string,
    followed:string
}

const dbInstance = collection(database, 'favs');

const followUser = (writerId:string,userId:string)=>{
    addDoc(dbInstance,
        { followed : writerId, follower:userId } as favInfo
    );
}
const unfollowUser = (writerId:string,userId:string)=>{
    let q = query(collection(database, 'favs'), where('followed', '==', writerId), where('follower', '==', userId));
    getDocs(q).then(data => 
        data.docs.map(x => deleteDoc(doc(dbInstance,x.id))
    ));
}

export {followUser,unfollowUser};



