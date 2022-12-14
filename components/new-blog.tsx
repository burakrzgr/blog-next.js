import { useEffect, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { BlogWriter, CreateBlog, Gender } from "../types/blog";
import { database } from '../config/firebase-config';
import { addDoc, arrayUnion, collection, doc, DocumentReference, getDocs, limit, query, updateDoc, where } from 'firebase/firestore'
import { useAuth } from "../context/auth-context";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const dbInstance = collection(database, 'blogs');

export default function NewBlog({editBlog}:{editBlog:CreateBlog}) {
    const { user } = useAuth();
    const [info, setInfo] = useState<CreateBlog>(editBlog);
    const [update, setUpdate] = useState({update:editBlog.blogId !== undefined,updateId:editBlog.blogId??''});

    useEffect(() => {
        setInfo(editBlog);
    }, [editBlog])
    

    const saveBlog = (data: CreateBlog) => {
        toast.promise(
            async () => {
                const insRes = await addDoc(dbInstance,
                {
                    content: data.content, header: data.header, writer:
                        data.anon ?
                            { writerId: 'RZmsIEB2ea5zN3lNlsgw', image:'', username:'Anonymous' } :
                            data.writer
                });
                await updateDoc(doc(database, 'writers', user.writerId),
                { blogs : arrayUnion(doc(database,`/blogs/${insRes.id}`))});
                setUpdate({update:true,updateId:insRes.id});
            },
            {
                pending: 'Kayediliyor!',
                success: 'Kaydedilme Başarılı!',
                error: 'Hata ile karşılaşıldı!'
            });
    }

    const updateBlog = (id:string,data: CreateBlog) => {
        toast.promise(
            async () => {
                const res = await updateDoc(doc(database, 'blogs', id),
                {
                    content: data.content, header: data.header, writer:
                        data.anon ?
                            { writerId: 'RZmsIEB2ea5zN3lNlsgw', image:'', username:'Anonymous' } :
                            data.writer
                
                });
            },
            {
                pending: 'Güncelleniyor!',
                success: 'Güncelleme Başarılı!',
                error: 'Hata ile karşılaşıldı!'
            });
    }


    return (
        <>
            <Card border="danger" >
                <Card.Header>
                    <Card.Subtitle className="mb-2 mt-2 text-muted">Başlık</Card.Subtitle>
                    <Form.Control placeholder="Yeni Bloğunun Başlığı" value={info.header} onChange={(e) => setInfo({ ...info, header: e.target.value })}></Form.Control>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">İçerik</Card.Subtitle>
                    <Form.Control as="textarea" rows={15} placeholder="İşte aradığın fırsat, hadi ilginç birşeyler yaz..." value={info.content}
                        onChange={(e) => setInfo({ ...info, content: e.target.value })}></Form.Control>
                </Card.Body>
                <Card.Footer className="pb-3 ">
                    <Stack direction="horizontal" >
                        {update.update ?<div className="ms-auto" ></div>:<Form.Check type="switch" className="ms-auto" label="Anonim olarak paylaş"
                            onChange={(e) => setInfo({ ...info, anon: e.target.checked })} checked={info.anon} />}
                        {update.update ?
                            <Button variant="warning" size="lg" className="ms-5 ps-4 pe-4 btn-lg fw-bold" style={{ letterSpacing: "0.1rem" }}
                                onClick={() => updateBlog(update.updateId,{ ...info, writer: { writerId: user.writerId, image:user.image, username:user.username } })}
                            >Güncelle</Button> :
                            <Button variant="danger" size="lg" className="ms-5 ps-4 pe-4 btn-lg fw-bold" style={{ letterSpacing: "0.1rem" }}
                                onClick={() => saveBlog({ ...info, writer: { writerId: user.writerId, image:user.image, username:user.username } })}>Yayınla</Button>
                        }
                    </Stack>
                </Card.Footer>
            </Card>
            <ToastContainer
                position="top-right"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

