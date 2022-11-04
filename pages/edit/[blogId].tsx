import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import NewBlog from "../../components/new-blog";
import styles from '../../styles/Home.module.css'


export default function EditBlog({ }) {
    //const [blog, setBlog] = useState<CreateBlog>({content:'',header:'',writer:{},anon:false});
    const router = useRouter();
    const { blogId } = router.query;

   /* useEffect(() => {
        let docRef = doc(database,'blogs', blogId as string); 
        getDoc(docRef)
            .then((data) => {
                setBlog(data.data() as CreateBlog );
            });
    }, [])
    */
    return (        
        <main className={styles.main} >
            <Container className={styles.container}>
                <NewBlog updateId={blogId as string} />
            </Container>
        </main>
    );
}
