import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'


export default function ReadBlogsPage({ }) {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('/api/blog')
          .then((res) => res.json())
          .then((data) => {
            setBlogs(data);
          })
      }, [])
    
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

