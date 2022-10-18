import Image from "next/image";
import { Stack } from "react-bootstrap";
import { Blog, CommunityInfo } from "../types/blog";

export default function CommunityAction({info}:{info:CommunityInfo}) {
    return (
        <Stack direction="horizontal" >
            <div className="me-2 btn btn-primary"><Image src="/svg/like.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.likes} Like</span></div> 
            <div className="me-2 btn btn-primary"><Image src="/svg/heart.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.loves} Heart</span></div> 
            <div className="me-2 btn btn-secondary"><Image src="/svg/dislike.svg" alt="Like Icon" width={20} height={20} /><span className="m-0 ms-1">{info.dislikes} Heart</span></div> 
        </Stack>
    );
}