import { Container } from "react-bootstrap";
import NewBlog from "../components/new-blog";
import ShowBlog from "../components/show-blog";
import styles from '../styles/Home.module.css'


export default function ReadBlogPage({ }) {
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <ShowBlog  blog={{content:"içerik içerik içerik",header:"Başlık",writer:"Burak Rüzgar"}} ></ShowBlog>
            </Container>
        </main>
    );
}

