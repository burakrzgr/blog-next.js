import { collection, doc, documentId, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect,useState } from "react";
import { Badge, Container } from "react-bootstrap";
import ShowBlog from "../../components/show-blog";
import { database } from "../../config/firebase-config";
import { useAuth } from "../../context/auth-context";
import styles from '../../styles/Home.module.css'
import { Blog, BlogWriter } from "../../types/blog";

const dbInstance = collection(database, 'blogs');

export default function WriterInfo({ }) {
    const [writer, setWriter] = useState<BlogWriter>({userId:'',color:'5600F2',image:'Non',username:'Loading'});
    const [blogs, setBlogs] = useState<{load:boolean,message:string,blog:Blog[]}>({load:false,message:'',blog:[]});
    const router = useRouter();
    const {user} = useAuth();
    const { writerId } = router.query;

    useEffect(() => {
        let docRef = doc(database,'writers',writerId as string); 
        getDoc(docRef)
            .then((data) => {
                setWriter(data.data() as BlogWriter);

                let miblog = (data.data().blogs as string[]);
                console.log("mi",miblog);
                let q2 = query(dbInstance,where(documentId(),'in',miblog))
                getDocs(q2).then((dat2) => {
                    setBlogs({load:true,message:'',blog:dat2.docs.map(x => { 
                        return {blogId:x.id,...x.data()} as Blog })});
                });
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
                <h3>{writer.username}</h3>
                {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger'>Report</Badge>}
                <p>{writerId}</p>

                {blogs.load?
                    <>
                      <div>{blogs.message}</div>
                      {blogs.blog.map((blog, key) => {
                        return (
                            <div className="pb-5" key={key}>
                                <ShowBlog blog={blog}></ShowBlog>
                            </div>
                        );
                      })}
                    </>
                :<h3 className="text-center">Az bi bekle. Yüklüyoz.</h3>}

            </Container>
        </main>
    );
}
