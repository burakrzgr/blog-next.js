import React from "react";
import { Comment } from "../types/blog";


export default function CommentDisplay({ comments }: { comments: any }) {
    const [count, setCount] = React.useState(0);
    const numOfcom =Object.keys(comments).length;
    return (
        <>
            {Object.keys(comments).map((id, inx) => { if (inx >= count) return; return (
                <div key={inx} className="border rounded-1 p-2 m-1">
                    <div className="badge bg-danger">{comments[id].writer}</div>
                    <div>{comments[id].content}</div>
                </div>
            ) })}
            {(numOfcom?? 0) === 0 ?
                <div>Henüz kimse yorum yazmadı. Düşüncelerini paylaşan ilk kişi sen ol.</div> :
                numOfcom - count > 0 ?
                    <div role="button" className="text-decoration-underline" onClick={() => setCount(count + 2)}>{numOfcom - count} yorumu {count > 0 ? "daha" : ""} görüntüleyin.</div> : <></>}
        </>
    );
}