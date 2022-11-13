import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import ShowBlogList, {ShowBlogProps} from "../../components/show-blog-list";
import styles from '../../styles/Home.module.css';
import { collection, getDocs, query, startAt, where } from "firebase/firestore";
import { database } from "../../config/firebase-config";
import { Blog } from "../../types/blog";

const dbInstance = collection(database, 'blogs');

export default function SearchPageKeyword({ }) {
    const router = useRouter();
    const { text } = router.query;
    const [blogs, setBlogs] = useState<ShowBlogProps>({load:false,blog:[]});
    useEffect(() => {
        //let q2 = query(dbInstance, where('header', '==', text))
        
        getDocs(dbInstance).then((dat2) => {
            let list = dat2.docs.map(x => {
                return { blogId: x.id, ...x.data() } as Blog});
            setBlogs({load: true, blog: list.filter(x => {return x.header.includes(text as string) && x.writer.includes(text as string)})});
            });
        //setBlogs({load:true,blog:[]})
    }, [text])
    
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <h5>{"Arama metini \""}{text}{"\" için "}{blogs?.blog?.length??0} sonuç bulundu.</h5>
                <ShowBlogList blogs={blogs}></ShowBlogList>
            </Container>
        </main>
    );
}
