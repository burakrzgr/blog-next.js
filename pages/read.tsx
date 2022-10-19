import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'



import { app, database } from '../config/firebase-config';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
    addDoc
} from 'firebase/firestore'
import { Blog } from "../types/blog";
const dbInstance = collection(database, 'blogs');






export default function ReadBlogsPage({ }) {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    useEffect(() => {
       /* fetch('/api/blog')
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            //setBlogs(data);
          })*/
         // saveData();
          getData();


      }, []);

      const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                setBlogs(data.docs.map(x => {return x.data() as Blog}));
            });
    }
    const saveData = () => {
        addDoc(dbInstance,
            { content: "Yapılanlar; Blok Yazma, Blog Okuma, Tema\nYapılacaklar; Blog kaydetme, Resim Yükleme,Yorum Yazma", header: "Başlık", writer: "Burak Rüzgar", community: { likes: 5, loves: 8, dislikes: 2, comments: [] } }
        )
    }
    
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                {blogs.map((blog, key) => {
                    return (
                        <div className="pb-5" key={key}>
                            <ShowBlog blog={blog}></ShowBlog>
                        </div>
                    );
                }
                )}
            </Container>
        </main>
    );
}

