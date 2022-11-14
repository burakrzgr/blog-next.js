import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewBlog from "../../components/new-blog";
import { database } from "../../config/firebase-config";
import styles from '../../styles/Home.module.css'
import { CreateBlog } from "../../types/blog";


export default function EditBlog({ }) {
    const [blog, setBlog] = useState<CreateBlog>({ blogId: '', content: '', header: '', writer: {image:'',username:'',writerId:''}, anon: false });
    const router = useRouter();
    const { blogId } = router.query;


    useEffect(() => {
        let docRef = doc(database, 'blogs', blogId as string);
        getDoc(docRef)
            .then((data) => {
                setBlog(data.data() as CreateBlog);
            });
    }, [blogId])

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <NewBlog editBlog={{ ...blog, blogId : blogId as string ,anon : false }} />
            </Container>
        </main>
    );
}
