import { Button, Card, Form, FormLabel, Stack } from "react-bootstrap";
import { Blog } from "../types/blog";

export default function ShowBlog({blog}:{blog:Blog}) {
    return (
        <>
            <Card border="danger" >
                <Card.Header>
                    <Stack direction="horizontal" >
                        <Card.Title className="mb-2 mt-2 text-muted"><h3>{blog.header}</h3></Card.Title>
                        <p className="text-secondary">{blog.writer}</p>
                    </Stack>
                </Card.Header>
                <Card.Body>
                <p className="mb-2 text-muted">{blog.content}</p>
                </Card.Body>
                <Card.Footer className="pb-3 ">
                    <Stack direction="horizontal" >
                        <Form.Check type="switch" className="ms-auto" label="Anonim olarak paylaş"/>
                        <Button variant="danger" size="lg" className="ms-5 ps-4 pe-4 btn-lg fw-bold" style={{letterSpacing: "0.1rem"}} >Yayınla</Button>
                    </Stack>
                </Card.Footer>
            </Card>
        </>
    );
}

