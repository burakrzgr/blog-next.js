import Image from "next/image";
import { createRef, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { Comment, CommunityInfo } from "../types/blog";
import CommentDisplay from "./comment-display";
import { database } from '../config/firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore'

const dbInstance = collection(database, 'blogs');

export default function CommunityAction({ blogId, info }: { blogId: string, info: CommunityInfo }) {
    const [commenting, setCommenting] = useState(false);
    const commentRef = createRef<HTMLTextAreaElement>();

    const saveComment = (data: Comment) => {
        const dbdoc = doc(database, 'blogs', blogId);
        const newGuid = doc(dbInstance).id;
        setDoc(dbdoc,
            {
                'community':
                {
                    'comments':
                        { [newGuid]: { 'content': data.content, writer: data.writer, date: data.date } }
                }
            },
            { merge: true }
        );
    }

    return (
        <div>
            <Stack direction="horizontal" >
                <Button variant="primary" size="lg" className="me-2"><Image className="" src="/svg/like.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.likes} Beğeni</span></Button>
                <Button variant="primary" size="lg" className="me-2"><Image src="/svg/heart.svg" alt="Love Icon" width={20} height={20} /><span className="m-0 ms-1">{info.loves} Hayran</span></Button>
                <Button variant="secondary" size="lg" className="me-2"><Image src="/svg/dislike.svg" alt="Dislike Icon" width={20} height={20} /><span className="m-0 ms-1">{info.dislikes} Yuhlama</span></Button>
                <Button variant="danger" size="lg" className="me-2 ms-5" onClick={() => { setCommenting(!commenting) }}><Image src="/svg/speech.svg" alt="Comment Icon" width={20} height={20} /><span className="m-0 ms-1">{commenting ? "Neyse Vazgeçtim" : "Yorum Yaz"}</span></Button>
                <Button variant="secondary" size="lg" className="me-2 ms-auto" ><Image src="/svg/more.svg" alt="More Icon" width={20} height={20} /></Button>
            </Stack>
            <div>{commenting ?
                <div style={{ display: "table", width: "100%" }} className="mt-4">
                    <div style={{ display: "table-cell" }} className="col-10">
                        <Form.Control ref={commentRef} type="text" placeholder="Yorum Yazın" as="textarea" rows={4}></Form.Control>
                    </div>
                    <div style={{ display: "table-cell" }} className="btn btn-outline-dark col-2" onClick={() => saveComment({ content: commentRef.current?.value ?? "", date: new Date(), writer: "Burak Rzgr" })}>Gönder
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