import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'
import { database } from '../config/firebase-config';
import { getDocs, collection, where, query, limit, getDoc, doc, FieldPath, documentId } from 'firebase/firestore'
import { Blog, BlogWriter } from "../types/blog";
import { useAuth } from "../context/auth-context";
import ShowBlogList, { ShowBlogProps } from "../components/show-blog-list";

const dbInstance = collection(database, 'blogs');

export default function MyBlogsPage({ }) {
  const { user } = useAuth();  
  const [blogs, setBlogs] = useState<ShowBlogProps>({load:false,blog:[]});
    useEffect(() => {
        getData();
    }, [user.uid]);

    const getData = () => {
      if (user.uid) { 
        let q = query(collection(database, 'writers'), where("userId", '==', user.uid), limit(1));
        getDocs(q).then((data) => {
            if(data.docs.length > 0)
            {
                let miblog = (data.docs[0].data().blogs as string[]);
                if(miblog.length > 0){
                    let q2 = query(dbInstance,where(documentId(),'in',miblog))
                    getDocs(q2).then((dat2) => {
                        setBlogs({load:true,blog:dat2.docs.map(x => { 
                            return {blogId:x.id,...x.data()} as Blog })});
                    });
                }
                else{
                    setBlogs({load:true,message:'Ee bişey yazmamışsın ki !!!',blog:[]});
                }
            
            }
        }).catch(ex => console.log(ex));
      }
    }

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <ShowBlogList blogs={blogs}></ShowBlogList>
            </Container>
        </main>
    );
}

