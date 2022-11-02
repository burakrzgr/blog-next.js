import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import styles from '../../styles/Home.module.css'


export default function WriterInfo({ }) {
    const router = useRouter()
    const { writerId } = router.query;
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <h3>Şu Id'li Yazar Bilgisi</h3>
                <p>{writerId}</p>
            </Container>
        </main>
    );
}
