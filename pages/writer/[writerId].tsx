import { doc, getDoc} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "../../components/profile-card";
import WriterBlog from "../../components/writer-blog";
import { database } from "../../config/firebase-config";
import styles from '../../styles/Home.module.css'
import { BlogWriter } from "../../types/blog";



export default function WriterInfo({ }) {
    const [writer, setWriter] = useState<BlogWriter>({userId:'',color:'5600F2',image:'Non',username:'Loading',blogs:[],desc:''});
    const router = useRouter();
    const { writerId } = router.query;

    useEffect(() => {
        let docRef = doc(database,'writers',writerId as string); 
        getDoc(docRef)
            .then((data) => {
                setWriter(data.data() as BlogWriter);
            });
    }, [])

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <Row>
                    <Col xs={12} sm={3}>
                        <ProfileCard writer={writer}></ProfileCard>
                    </Col>
                    <Col xs={12} sm={9}>
                        <WriterBlog blogs={writer.blogs}></WriterBlog>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
