import Image from "next/image";
import { createRef, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Comment, CommunityInfo } from "../types/blog";
import CommentDisplay from "./comment-display";
import { database } from '../config/firebase-config';
import { addDoc, collection } from 'firebase/firestore'
import { AiOutlineLike, AiOutlineDislike,AiOutlineHeart, AiOutlineComment, AiOutlineMore,AiOutlineSend } from 'react-icons/ai';

//const dbInstance = collection(database, 'blogs');

export default function CommunityAction({ blogId, info }: { blogId: string, info: CommunityInfo }) {
    const [commenting, setCommenting] = useState(false);
    const commentRef = createRef<HTMLTextAreaElement>();

    const saveComment = (data: Comment) => {
        const db = collection(database, `blogs/${blogId}/comments`);
        addDoc(db, data).then((res => setCommenting(false)));
    }

    return (
        <div>
            <Stack direction="horizontal" >
                <Button variant="primary" size="lg" className="me-2"><AiOutlineLike /><span className="m-0 ms-1">{info.likes} Beğeni</span></Button>
                <Button variant="primary" size="lg" className="me-2"><AiOutlineHeart /><span className="m-0 ms-1">{info.loves} Hayran</span></Button>
                <Button variant="secondary" size="lg" className="me-2"><AiOutlineDislike /><span className="m-0 ms-1">{info.dislikes} Yuhlama</span></Button>
                <Button variant="danger" size="lg" className="me-2 ms-5" onClick={() => setCommenting(!commenting)}>
                    <AiOutlineComment /><span className="m-0 ms-1">{commenting ? "Neyse Vazgeçtim" : "Yorum Yaz"}</span>
                </Button>
                <Button variant="secondary" size="lg" className="me-2 ms-auto" ><AiOutlineMore /></Button>
            </Stack>
            <div>{commenting ?
                <div style={{ display: "table", width: "100%" }} className="mt-4">
                    <div style={{ display: "table-cell" }} className="col-10">
                        <Form.Control ref={commentRef} type="text" placeholder="Yorum Yazın" as="textarea" rows={4}></Form.Control>
                    </div>
                    <div style={{ display: "table-cell" }} className="btn btn-outline-dark col-2" onClick={() => saveComment({ content: commentRef.current?.value ?? "", date: new Date(), writer: "Burak Rzgr" })}>
                        <AiOutlineSend />
                        <div>Gönder</div>
                    </div>
                </div> : <></>}</div>
            <div className="me-2 mt-4 text-muted">
                <span className="m-0 ms-1">
                    <CommentDisplay comments={info.comments ?? {}} blogId={blogId}></CommentDisplay>
                </span>
            </div>
        </div>
    );
}