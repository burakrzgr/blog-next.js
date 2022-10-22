import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { CreateBlog } from "../types/blog";
import { database } from '../config/firebase-config';
import { addDoc, collection } from 'firebase/firestore'
import { Blog } from "../types/blog";

const dbInstance = collection(database, 'blogs');

    const saveBlog = (data: CreateBlog) => {
        return addDoc(dbInstance,
            { content: data.content, header: data.header, writer: data.anon?"Anonymous":"Burak Rüzgar" , community: { likes: 0, loves: 0, dislikes: 0, comments: [] } }
        )
    }


export default function NewBlog(props:any) {
    const [info, setInfo] = useState<CreateBlog>({header:"",content:"",anon:false});
   
   /* const send = (data:CreateBlog) => fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
*/

    return (
        <>
            <Card border="danger" >
                <Card.Header>
                <Card.Subtitle className="mb-2 mt-2 text-muted">Başlık</Card.Subtitle>
                    <Form.Control placeholder="Yeni Bloğunun Başlığı" onChange={(e) => setInfo({...info, header: e.target.value})}></Form.Control>
                </Card.Header>
                <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">İçerik</Card.Subtitle>
                    <Form.Control as="textarea" rows={15} placeholder="İşte aradığın fırsat, hadi ilginç birşeyler yaz..." 
                        onChange={(e) => setInfo({...info, content: e.target.value})}></Form.Control>
                </Card.Body>
                <Card.Footer className="pb-3 ">
                    <Stack direction="horizontal" >
                        <Form.Check type="switch" className="ms-auto" label="Anonim olarak paylaş" 
                            onChange={(e) => setInfo({...info, anon: e.target.checked})} checked={info.anon} />
                        <Button variant="danger" size="lg" className="ms-5 ps-4 pe-4 btn-lg fw-bold" style={{letterSpacing: "0.1rem"}} 
                            onClick={() => {saveBlog(info).then((res) => console.log(res))}}>Yayınla</Button>
                    </Stack>
                </Card.Footer>
            </Card>
        </>
    );
}

