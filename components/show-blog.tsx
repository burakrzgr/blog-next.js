import { Card, Stack } from "react-bootstrap";
import { Blog, BlogWriter } from "../types/blog";
import CommunityAction from "./community-action";

export default function ShowBlog({blog}:{blog:Blog}) {
    return (
        <>
        {console.log("t",Object.values(blog.writer)[0])}
            <Card border="secondary" >
                <Card.Header>
                    <Stack direction="horizontal" >
                        <Card.Title className="mb-2 mt-2"><h3>{blog.header}</h3></Card.Title>
                        
                        <Stack direction="vertical" className="ms-auto p-0 m-0">
                            <p className="text-muted ms-auto p-0 m-0">Yazar</p>    
                            <p className="text-secondary ms-auto p-0 m-0">{Object.values<BlogWriter>(blog.writer)[0]?.username??"[Anon]"}</p>
                        </Stack>
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

