import Router, { useRouter } from "next/router";
import React from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap";
import styles from '../../styles/Home.module.css'


export default function SearchPage({ }) {
    const [seachText, setSearchText] = React.useState("");
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <form className="w-100" onSubmit={(e) => { e.preventDefault(); Router.push(`/search/${encodeURIComponent(seachText)}`) }}>
                    <p>Arayabilmemiz için bişeyler yazmaya ne dersiniz?</p>
                    <ButtonGroup className="w-100">
                        <Form.Control type="text" size="lg" placeholder="Blogları yada yazarları arayın..." value={seachText} onChange={e => setSearchText(e.target.value)}></Form.Control>
                        <Button variant="secondary" className="ps-4 pe-4" size="lg" type="submit" >Ara</Button>
                    </ButtonGroup>
                </form>
            </Container>
        </main>
    );
}
