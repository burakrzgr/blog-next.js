import { Button, Card, Stack } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { Blog, BlogWriter } from "../types/blog";
import CommunityAction from "./community-action";
import { AiOutlineEdit } from 'react-icons/ai';
import Router from "next/router";
import { AnonId } from "../config/my-config";

export default function ShowBlog({blog}:{blog:Blog}) {
    const { user } = useAuth();
    const go=(key:string)=>{
        if(key && key !== AnonId){
            Router.push(`/writer/${key}`);
        }
    }
    return (
        <>
            <Card border="secondary" >
                <Card.Header>
                    <Stack direction="horizontal" >
                        <Card.Title className="mb-2 mt-2"><h3>{blog.header}</h3></Card.Title>
                        <Stack direction="vertical" className="ms-auto p-0 m-0">
                            <p className="text-muted ms-auto p-0 m-0">Yazar</p>    
                            <p className="text-secondary ms-auto p-0 m-0" role="button" onClick={() => go(blog.writer.writerId)}>{blog.writer.username??"[Anon]"}</p>
                        </Stack>
                        {blog.writer.writerId === user.writerId ?
                            <Button variant="warning" className="ms-2 m-0 p-1 ps-2 pe-2 h-100" onClick={() => Router.push(`/edit/${blog.blogId}`)}>
                                <AiOutlineEdit></AiOutlineEdit>
                            </Button>:
                            <></>}
                    </Stack>
                </Card.Header>
                <Card.Body>
                    <p className="mb-2 mt-3 text-warning" style={{whiteSpace:"pre-line"}}>{blog.content}</p>
                </Card.Body>
                <Card.Footer className="pb-3 ">
                   <CommunityAction blogId={blog.blogId} info={blog.community??{likes:0,dislikes:0,loves:0,comments:[]}} />
                </Card.Footer>
            </Card>
        </>
    );
}

