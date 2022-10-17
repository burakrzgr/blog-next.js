import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import styles from '../../styles/Home.module.css'


export default function SearchPageKeyword({ }) {
    const router = useRouter()
    const { text } = router.query;
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <p>{text}</p>
            </Container>
        </main>
    );
}
