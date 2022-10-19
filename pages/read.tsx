import React from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'


export default function ReadBlogsPage({ }) {
    const [blogs, setBlogs] = React.useState([{ content: "Yapılanlar; Blok Yazma, Blog Okuma, Tema<br />Yapılacaklar; Blog kaydetme, Resim Yükleme,Yorum Yazma", header: "Başlık", writer: "Burak Rüzgar", community: { likes: 5, loves: 8, dislikes: 2, comments: [] } }])
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                {blogs.map((blog, key) => {
                    return (
                        <ShowBlog blog={blog} key={key} ></ShowBlog>
                    );
                }
                )}
            </Container>
        </main>
    );
}

