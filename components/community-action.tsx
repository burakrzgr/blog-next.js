import Image from "next/image";
import { Button, Stack } from "react-bootstrap";
import { CommunityInfo } from "../types/blog";
import CommentDisplay from "./comment-display";

export default function CommunityAction({info}:{info:CommunityInfo}) {
    return (
        <div>
            <Stack direction="horizontal" >
                <Button variant="primary" size="lg" className="me-2"><Image className="" src="/svg/like.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.likes} Beğeni</span></Button> 
                <Button variant="primary" size="lg" className="me-2"><Image src="/svg/heart.svg" alt="Love Icon" width={20} height={20} /><span className="m-0 ms-1">{info.loves} Hayran KAlma</span></Button> 
                <Button variant="secondary" size="lg" className="me-2"><Image src="/svg/dislike.svg" alt="Dislike Icon" width={20} height={20} /><span className="m-0 ms-1">{info.dislikes} Yuhlama</span></Button> 
                <Button variant="danger" size="lg" className="me-2 ms-5" ><Image src="/svg/speech.svg" alt="Comment Icon" width={20} height={20} /><span className="m-0 ms-1">Yorum Yaz</span></Button> 
                <Button variant="secondary" size="lg" className="me-2 ms-auto" ><Image src="/svg/more.svg" alt="More Icon" width={20} height={20} /></Button>
            </Stack>
            <div className="me-2 mt-4 text-muted">
                <span className="m-0 ms-1">
                    <CommentDisplay comments={info.comments??[]} ></CommentDisplay>
                </span>
            </div> 
        </div>
    );
}