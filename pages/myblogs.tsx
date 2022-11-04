import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'
import { database } from '../config/firebase-config';
import { getDocs, collection, where, query, limit, getDoc, doc } from 'firebase/firestore'
import { Blog, BlogWriter } from "../types/blog";
import { useAuth } from "../context/auth-context";

const dbInstance = collection(database, 'blogs');

export default function MyBlogsPage({ }) {
  const { user } = useAuth();  
  const [blogs, setBlogs] = useState<{load:boolean,message:string,blog:Blog[]}>({load:false,message:'',blog:[]});
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
      if (user.uid) {
        let q = query(collection(database, 'blogs'), where("writer", 'array-contains-any', user.uid), limit(10));
        getDocs(q)
                .then((data) => {
                    alert(data.docs);
                }).catch(ex => console.log(ex));
        /*getDoc(doc(database,'writers',user.uid))
            .then((data) => {
           
            getDocs(q)
                .then((data) => {
                    setBlogs({load:true,message:'',blog:data.docs.map(x => { 
                        return {blogId:x.id,...x.data()} as Blog })});
                });


        });*/

          
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

