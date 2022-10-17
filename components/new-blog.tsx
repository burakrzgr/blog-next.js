import { Card, Form } from "react-bootstrap";

export default function NewBlog(props:any) {
    return (
        <>
            <Card border="danger" className="p-2">
                <Card.Header>
                <Card.Subtitle className="mb-2 text-muted">Başlık</Card.Subtitle>
                    <Form.Control placeholder="Yeni Blog Başlığı" ></Form.Control>
                </Card.Header>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Form.Control as="textarea" rows={15} placeholder="İşte aradığın fırsat, ilginç birşeyler yaz..."></Form.Control>
                </Card.Body>
            </Card>
        </>
    );
}

