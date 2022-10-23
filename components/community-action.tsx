import Image from "next/image";
import { createRef, useRef, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { CommunityInfo } from "../types/blog";
import CommentDisplay from "./comment-display";

export default function CommunityAction({info}:{info:CommunityInfo}) {
    const [commenting, setCommenting] = useState(false);
    const commentRef = createRef<HTMLTextAreaElement>();
    return (
        <div>
            <Stack direction="horizontal" >
                <Button variant="primary" size="lg" className="me-2"><Image className="" src="/svg/like.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.likes} Beğeni</span></Button> 
                <Button variant="primary" size="lg" className="me-2"><Image src="/svg/heart.svg" alt="Love Icon" width={20} height={20} /><span className="m-0 ms-1">{info.loves} Hayran KAlma</span></Button> 
                <Button variant="secondary" size="lg" className="me-2"><Image src="/svg/dislike.svg" alt="Dislike Icon" width={20} height={20} /><span className="m-0 ms-1">{info.dislikes} Yuhlama</span></Button> 
                <Button variant="danger" size="lg" className="me-2 ms-5" onClick={() =>{setCommenting(true)}}><Image src="/svg/speech.svg" alt="Comment Icon" width={20} height={20} /><span className="m-0 ms-1">Yorum Yaz</span></Button> 
                <Button variant="secondary" size="lg" className="me-2 ms-auto" ><Image src="/svg/more.svg" alt="More Icon" width={20} height={20} /></Button>
            </Stack>
            <div>{commenting?
                <div style={{display:"table",width:"100%"}} className="mt-4">
                    <div style={{display:"table-cell"}}  className="col-10">
                        <Form.Control ref={commentRef} type="text" placeholder="Yorum Yazın"  as="textarea" rows={4}></Form.Control>
                    </div>
                    <div style={{display:"table-cell"}}  className="btn btn-outline-dark col-2">Gönder
                    </div>
                </div>:<></>}</div>
            <div className="me-2 mt-4 text-muted">
                <span className="m-0 ms-1">
                    <CommentDisplay comments={info.comments??[]} ></CommentDisplay>
                </span>
            </div> 
        </div>
    );
}