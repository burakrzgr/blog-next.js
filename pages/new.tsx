import { Container } from "react-bootstrap";
import NewBlog from "../components/new-blog";
import styles from '../styles/Home.module.css'


export default function NewBlogPage({ }) {
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <NewBlog  >
                </NewBlog>
            </Container>
        </main>
    );
}

