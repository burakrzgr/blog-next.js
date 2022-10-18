import { Button, Card, Form, FormLabel, Stack } from "react-bootstrap";
import { Blog } from "../types/blog";
import CommunityAction from "./community-action";

export default function ShowBlog({blog}:{blog:Blog}) {
    return (
        <>
            <Card border="danger" >
                <Card.Header>
                    <Stack direction="horizontal" >
                        <Card.Title className="mb-2 mt-2 text-muted"><h3>{blog.header}</h3></Card.Title>
                        <Stack direction="vertical" className="ms-auto">
                            <p className="text-muted">Yazar</p>
                            <p className="text-secondary ms-auto">{blog.writer}</p>
                        </Stack>
                        
                    </Stack>
                </Card.Header>
                <Card.Body>
                <p className="mb-2 text-muted">{blog.content}</p>
                </Card.Body>
                <Card.Footer className="pb-3 ">
                   <CommunityAction blog={blog} />
                </Card.Footer>
            </Card>
        </>
    );
}

