import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import ShowBlogList, {ShowBlogProps} from "../../components/show-blog-list";
import styles from '../../styles/Home.module.css';


export default function SearchPageKeyword({ }) {
    const router = useRouter();
    const { text } = router.query;
    const [blogs, setBlogs] = useState({load:false,blog:[]});
    useEffect(() => {
      setBlogs({load:true,blog:[]})
    }, [])
    
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <h5>Arama metini "{text}" için {blogs?.blog?.length??0} sonuç bulundu.</h5>
                <ShowBlogList blogs={blogs}></ShowBlogList>
            </Container>
        </main>
    );
}
