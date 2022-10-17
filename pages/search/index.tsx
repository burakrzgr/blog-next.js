import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import styles from '../../styles/Home.module.css'


export default function SearchPage({ }) {
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <p>Try to type something in order to search</p>
                <Form.Control size="lg" placeholder="Search Something"></Form.Control>
            </Container>
        </main>
    );
}
