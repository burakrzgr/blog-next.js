import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { database } from "../../config/firebase-config";
import { useAuth } from "../../context/auth-context";
import styles from '../../styles/Home.module.css'
import { Blog, BlogWriter } from "../../types/blog";


export default function WriterInfo({ }) {
    const [writer, setWriter] = useState<BlogWriter>({userId:'',color:'5600F2',image:'Non',username:'Loading'});
    const [blogs , setBlogs] = useState<Blog[]>([]);
    const router = useRouter();
    const {user} = useAuth();
    const { writerId } = router.query;

    useEffect(() => {
        let docRef = doc(database,'writers',writerId as string); 
        getDoc(docRef)
            .then((data) => {
                setWriter(data.data() as BlogWriter );
            });
    }, [])
    
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <h3>{writer.username}</h3>
                {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger'>Report</Badge>}
                <p>{writerId}</p>
            </Container>
        </main>
    );
}
