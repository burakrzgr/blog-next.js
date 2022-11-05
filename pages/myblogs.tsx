import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'
import { database } from '../config/firebase-config';
import { getDocs, collection, where, query, limit, getDoc, doc, FieldPath, documentId } from 'firebase/firestore'
import { Blog, BlogWriter } from "../types/blog";
import { useAuth } from "../context/auth-context";

const dbInstance = collection(database, 'blogs');

export default function MyBlogsPage({ }) {
  const { user } = useAuth();  
  const [blogs, setBlogs] = useState<{load:boolean,message:string,blog:Blog[]}>({load:false,message:'',blog:[]});
    useEffect(() => {
        getData();
    }, [user.uid]);

    const getData = () => {
        
       user.uid
      if (user.uid) { 
        console.log("mi");
        let q = query(collection(database, 'writers'), where("userId", '==', user.uid), limit(1));
        getDocs(q).then((data) => {
            if(data.docs.length > 0)
            {
                let miblog = (data.docs[0].data().blogs as string[]);
                console.log("mi",miblog);
                let q2 = query(dbInstance,where(documentId(),'in',miblog))
                

                getDocs(q2).then((dat2) => {
                    setBlogs({load:true,message:'',blog:dat2.docs.map(x => { 
                        return {blogId:x.id,...x.data()} as Blog })});
                });
            
            }
        }).catch(ex => console.log(ex));
      }
      else{

      }
    }

    return (
        <main className={styles.main} >
            <Container className={styles.container}>
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

