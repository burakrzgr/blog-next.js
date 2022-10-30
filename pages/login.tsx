import Router from 'next/router';
import { useState } from 'react';
import { Button, Card, Container, Form, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import styles from '../styles/Home.module.css'

export default function Login() {
    const { login, signup, user } = useAuth();

    const [isLogginIn, setIsLogginIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [username, setUsername] = useState("");

    async function submitHandler() {
        if (isLogginIn) {
            await login(email, password);
        }
        else {
            await signup(email, password);
        }
        await Router.push("/read");
    }

    return (
        <main className={styles.main} >
            <Container style={{ width: "35rem" }}>
                <Card>
                    <Card.Body>
                        <div className='text-auto'>
                            <div className='' style={{ width: "10rem" }}>{isLogginIn ? <h3>Login</h3> : <h3>Register</h3>}</div>
                        </div>
                        <Stack direction='vertical'>
                            {!isLogginIn ?
                                <>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={(e) => setUsername(e.target.value)} value={username}></Form.Control>
                                </> : <></>
                            }
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control onChange={(e) => setEmail(e.target.value)} value={email}></Form.Control>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} value={password}></Form.Control>
                            {!isLogginIn ?
                                <>
                                    <Form.Label>Password Again</Form.Label>
                                    <Form.Control type='password' onChange={(e) => setPasswordAgain(e.target.value)} value={passwordAgain}></Form.Control>
                                </> : <></>
                            }
                        </Stack>
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction='horizontal'>
                            <Button variant='outline-secondary' onClick={() => setIsLogginIn(!isLogginIn)}>Hesabın Yok mu?</Button>
                            <Button variant='primary ms-auto' onClick={() => submitHandler()}> Giriş Yap</Button>
                        </Stack>
                    </Card.Footer>
                </Card>
            </Container>
        </main>
    );
}
