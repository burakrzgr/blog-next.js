import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { database } from "../config/firebase-config";



export default function CommentDisplay({ comments,blogId }: { comments: any,blogId:string }) {
    const dbInstance = collection(database, `blogs/${blogId}/comments`);
    

    const [count, setCount] = React.useState(0);
    const numOfcom =Object.keys(comments).length;


    useEffect(() => {
       
        let ref = collection(database, `blogs/${blogId}/comments`);
        onSnapshot(ref,(snapshot) => {
         // const postData = [];
          snapshot.forEach((doc) => console.log({ ...doc.data(), id: doc.id }));
        });
      }, []);





    return (
        <>
            {Object.keys(comments).map((id, inx) => { if (inx >= count) return; return (
                <Stack key={inx} className="border rounded-1 p-2 m-1" direction="horizontal">
                    <div >
                        <div className="badge bg-danger">{comments[id].writer}</div>
                        <div className="mt-1">{comments[id].content}</div>
                    </div>
                    <div className="ms-auto mb-auto badge bg-info" >{comments[id].date?comments[id].date.toDate().toLocaleString('tr-TR'):"Tarih Yok"}</div>
                </Stack>
            ) })}
            {(numOfcom?? 0) === 0 ?
                <div>Henüz kimse yorum yazmadı. Düşüncelerini paylaşan ilk kişi sen ol.</div> :
                numOfcom - count > 0 ?
                    <div role="button" className="text-decoration-underline" onClick={() => setCount(count + 2)}>{numOfcom - count} yorumu {count > 0 ? "daha" : ""} görüntüleyin.</div> : <></>}
        </>
    );
}