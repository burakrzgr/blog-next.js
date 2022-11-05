import { collection, doc, documentId, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import WriterBlog from "../../components/writer-blog";
import { database } from "../../config/firebase-config";
import { useAuth } from "../../context/auth-context";
import styles from '../../styles/Home.module.css'
import { BlogWriter } from "../../types/blog";



export default function WriterInfo({ }) {
    const [writer, setWriter] = useState<BlogWriter>({userId:'',color:'5600F2',image:'Non',username:'Loading',blogs:[]});
    const router = useRouter();
    const {user} = useAuth();
    const { writerId } = router.query;

    useEffect(() => {
        let docRef = doc(database,'writers',writerId as string); 
        getDoc(docRef)
            .then((data) => {
                setWriter(data.data() as BlogWriter);
            });
    }, [])
    

    const getData = () => {
        if (user.uid) { 
          let q = query(collection(database, 'writers'), where("userId", '==', user.uid), limit(1));
        }
      }


    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <Row>
                    <Col xs={12} sm={3}>
                        <h3>{writer.username}</h3>
                        {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger'>Report</Badge>}
                        <p>{writerId}</p>
                    </Col>
                    <Col xs={12} sm={9}>
                        <WriterBlog writer={writer}></WriterBlog>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
