import Image from "next/image";
import { Stack } from "react-bootstrap";
import { CommunityInfo } from "../types/blog";
import CommentDisplay from "./comment-display";

export default function CommunityAction({info}:{info:CommunityInfo}) {
    return (
        <div>
            <Stack direction="horizontal" >
                <div className="me-2 btn btn-lg btn-primary"><Image className="" src="/svg/like.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.likes} Likes</span></div> 
                <div className="me-2 btn btn-lg btn-primary"><Image src="/svg/heart.svg" alt="Love Icon" width={20} height={20} /><span className="m-0 ms-1">{info.loves} Hearts</span></div> 
                <div className="me-2 btn btn-lg btn-secondary"><Image src="/svg/dislike.svg" alt="Dislike Icon" width={20} height={20} /><span className="m-0 ms-1">{info.dislikes} Dislikes</span></div> 
                <div className="me-2 btn btn-lg btn-danger ms-5"><Image src="/svg/speech.svg" alt="Dislike Icon" width={20} height={20} /><span className="m-0 ms-1">Leave a comment</span></div> 
                <div className="me-2 ms-auto btn btn-lg btn-secondary"><Image src="/svg/more.svg" alt="More Icon" width={20} height={20} /></div>
            </Stack>
            <div className="me-2 mt-4 text-muted">
                <span className="m-0 ms-1">
                    <CommentDisplay comments={info.comments??[]} ></CommentDisplay>
                </span>
            </div> 
        </div>
    );
}