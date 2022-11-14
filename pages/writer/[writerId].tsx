import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import ProfileCard from "../../components/profile-card";
import ProfileWriter from "../../components/profile-writer";
import { database } from "../../config/firebase-config";
import styles from '../../styles/Home.module.css'
import { BlogWriter, Gender } from "../../types/blog";



export default function WriterInfo({ }) {
    const [writer, setWriter] = useState<BlogWriter>({ id:'', userId: '', color: '5600F2', image: '', username: 'Loading', desc: '',blogs:undefined,gender:Gender.Non });
    const router = useRouter();
    const { writerId } = router.query;
    const [key, setKey] = useState('blogs');

    useEffect(() => {
        let docRef = doc(database, 'writers', writerId as string);
        getDoc(docRef)
            .then((data) => {
                setWriter({...data.data() as BlogWriter,id : data.id});
            });

         
    }, [])

    return (
        <main className={styles.profile}>
            <Row className="w-75" style={{minHeight:'75vh !important'}}>
                <Col xs={12} sm={3}>
                    <ProfileCard writer={writer}></ProfileCard>
                </Col>
                <Col xs={12} sm={9} >
                    <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k??'blogs')}
                        className="mb-3"
                    >
                        <Tab eventKey="blogs" title="Yazdığı Bloglar">
                            <ProfileWriter blogs={writer.blogs}></ProfileWriter>
                        </Tab>
                        <Tab eventKey="edit" title="Profili Düzenle">
                            <>Edit options</>
                        </Tab>
                    </Tabs>

                </Col>
            </Row>
        </main>
    );
}
