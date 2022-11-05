import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'
import { database } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore'
import { Blog } from "../types/blog";
import ShowBlogList, { ShowBlogProps } from "../components/show-blog-list";

const dbInstance = collection(database, 'blogs');

export default function ReadBlogsPage({ }) {
    const [blogs, setBlogs] = useState<ShowBlogProps>({load:false,blog:[]});
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                setBlogs({load:true,blog:data.docs.map(x => { 
                    return {blogId:x.id,...x.data()} as Blog })});
            });
    }

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <ShowBlogList blogs={blogs}></ShowBlogList>
            </Container>
        </main>
    );
}

