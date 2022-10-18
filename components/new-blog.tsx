import { Button, Card, Form, Stack } from "react-bootstrap";

export default function NewBlog(props:any) {
    return (
        <>
            <Card border="danger" >
                <Card.Header>
                <Card.Subtitle className="mb-2 mt-2 text-muted">Başlık</Card.Subtitle>
                    <Form.Control placeholder="Yeni Blog Başlığı" ></Form.Control>
                </Card.Header>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">İçerik</Card.Subtitle>
                    <Form.Control as="textarea" rows={15} placeholder="İşte aradığın fırsat, hadi ilginç birşeyler yaz..."></Form.Control>
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

