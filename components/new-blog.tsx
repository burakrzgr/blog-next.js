import { useEffect, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { BlogWriter, CreateBlog } from "../types/blog";
import { database } from '../config/firebase-config';
import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'
import { useAuth } from "../context/auth-context";

const dbInstance = collection(database, 'blogs');

    
const saveBlog = (data: CreateBlog) => {
    addDoc(dbInstance,
        { content: data.content, header: data.header, writer: 
            data.anon?
                {["RxrvSA0ZawSjanoiUYPhUW6dCu93"]:{username:"Anon",image:"test",color:"000000"}}:
                data.writer
        }
    ).then((res) => console.log(res));
}


export default function NewBlog() {
    const {user} = useAuth();
    const [info, setInfo] = useState<CreateBlog>({header:"",content:"",anon:false,writer:{[user.uid]:{username:"Anon",image:"test",color:"000000"}}});
    const [writer, setWriter] = useState<BlogWriter>({userId:'RxrvSA0ZawSjanoiUYPhUW6dCu93',username:"Anon",image:"test",color:"000000"}); 

    useEffect(() => {
        if(user.uid){
            let q = query(collection(database, 'writers'), where("userId",'==',user.uid), limit(1));

            getDocs(q)
                .then((data) => {
                    console.log(data.docs[0].data() as BlogWriter);
                    data.docs.length > 0 ?
                        setWriter(data.docs[0].data() as BlogWriter):
                        setWriter({userId:'RxrvSA0ZawSjanoiUYPhUW6dCu93',username:"Anon",image:"test",color:"000000"});
                });
        }

    }, [])
    
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
                            onClick={() => saveBlog({...info, writer:{[writer.userId]:writer}})}>Yayınla</Button>
                    </Stack>
                </Card.Footer>
            </Card>
        </>
    );
}

