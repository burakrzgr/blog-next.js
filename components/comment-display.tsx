import React from "react";
import { Comment } from "../types/blog";


export default function CommentDisplay({ comments }: { comments: Comment[] }) {
    const [count, setCount] = React.useState(0);

    return (
        <>
            {comments.map((com: Comment, inx) => { if (inx >= count) return; return (<div key={inx}>{com.content}</div>) })}
            {(comments.length ?? 0) === 0 ?
                <div>Henüz kimse yorum yazmadı. Düşüncelerini paylaşan ilk kişi sen ol.</div> :
                comments.length - count > 0 ?
                    <div role="button" className="text-decoration-underline" onClick={() => setCount(count + 2)}>{comments.length - count} yorumu {count > 0 ? "daha" : ""} görüntüleyin.</div> : <></>}
        </>
    );
}