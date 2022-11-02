import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'
import { database } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore'
import { Blog } from "../types/blog";

const dbInstance = collection(database, 'blogs');

export default function ReadBlogsPage({ }) {
    const [blogs, setBlogs] = useState<{load:boolean,blog:Blog[]}>({load:false,blog:[]});
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                //data.docs.map(x => console.log({...x.data(),community:{...x.data().community, comments: [...x.data().community.comments.value] }} as Blog));
                setBlogs({load:true,blog:data.docs.map(x => { 
                    //console.log(x.get("writer"));
                    return {blogId:x.id,...x.data()} as Blog })});
            });
    }

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                {blogs.load?
                blogs.blog.map((blog, key) => {
                    return (
                        <div className="pb-5" key={key}>
                            <ShowBlog blog={blog}></ShowBlog>
                        </div>
                    );
                }
                ):<h3 className="text-center">Az bi bekle. Yüklüyoz.</h3>}
            </Container>
        </main>
    );
}

