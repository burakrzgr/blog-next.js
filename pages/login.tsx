import { FirebaseError } from 'firebase/app';
import Router from 'next/router';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import styles from '../styles/Home.module.css'

type StringMap = {
    [key: string]: string;
  };
   
  const errorTranslate: StringMap = {
    'auth/invalid-email' : "Mail adresi hatalı!",
    'auth/user-not-found' : "Kullanıcı Bulunamadı!",
    'auth/wrong-password' : "Hatalı Şifre!",
    'auth/email-already-in-use' : "Bu Mail Adresi Kullanılıyor!",
    'auth/internal-error':"Bilinmeyen Bir Hata!"
  };

export default function Login() {
    const { login, signup } = useAuth();

    const [isLogginIn, setIsLogginIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [username, setUsername] = useState("");
    const [error,setError] = useState("");

    async function submitHandler() {
        if(!isLogginIn && password !== passwordAgain){
            setError("Şifreler aynı değil!");
            return;
        }
        let redirect = false;
        if (isLogginIn) {
            try{
                await login(email, password);
                redirect = true;
            }
            catch(err){
                if(err instanceof FirebaseError){
                    setError(errorTranslate[err.code]??"Bilinmeyen Hata! ("+err.code+")");
                }
            }
        }
        else {
            try{
                await signup(email, password,username);
                redirect = true;
            }
            catch(err){
                if(err instanceof FirebaseError){
                    setError(errorTranslate[err.code]??"Bilinmeyen Hata! ("+err.code+")");
                }
            }
        }
        if(redirect){
            await Router.push("/read");
        }
    }

    return (
        <main className={styles.main} >
            <Container style={{ width: "35rem" }}>
                <Card>
                    <Card.Body>
                        <div className='text-center'>
                            {isLogginIn ? <h2>Giriş</h2> : <h2>Kayıt</h2>}
                        </div>
                        <Stack direction='vertical' gap={2} className="p-2">
                            {error && error.length>0?<Alert variant='danger'>{error}</Alert>:<></>}
                            {!isLogginIn ?
                                <Form.Group>
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                    <Form.Control onChange={(e) => setUsername(e.target.value)} value={username}></Form.Control>
                                </Form.Group> : <></>
                            }
                            <Form.Group>
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Şifre</Form.Label>
                                <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} value={password}></Form.Control>
                            </Form.Group>
                            {!isLogginIn ?
                                <Form.Group>
                                    <Form.Label>Şifre Tekrarı</Form.Label>
                                    <Form.Control type='password' onChange={(e) => setPasswordAgain(e.target.value)} value={passwordAgain}></Form.Control>
                                </Form.Group> : <></>
                            }
                        </Stack>
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction='horizontal' className='p-2'>
                            <Button variant='outline-secondary' onClick={() => setIsLogginIn(!isLogginIn)}> {isLogginIn ?<>Hesabın Yok mu?</>:<>Hesabın Var mı?</>}</Button>
                            <Button variant='primary ms-auto' onClick={() => submitHandler()}> {isLogginIn ?<>Giriş Yap</>:<>Kayıt Ol</>}</Button>
                        </Stack>
                    </Card.Footer>
                </Card>
            </Container>
        </main>
    );
}
