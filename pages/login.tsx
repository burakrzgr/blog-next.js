import { useState } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';




export default function Login () {
    const { login, signup, user } = useAuth();
    
    const [isLogginIn, setIsLogginIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

async function submitHandler(){
    if(isLogginIn){
        await login(email,password);
    }
    else{
        await signup(email,password);
    }
} 

  return (
    <Container className='pt-5'>
        <Stack direction='horizontal'>
            <div className='pe-5' style={{width:"10rem"}}>{isLogginIn?<h3>Login</h3>:<h3>Register</h3>}</div>
            <Button onClick={() => setIsLogginIn(!isLogginIn)}>Değiştir</Button>
        </Stack>
        <p>E-Mail</p>
        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email}></Form.Control>
        <p>Password</p>
        <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} value={password}></Form.Control>
        <Button onClick={() => submitHandler()}> Giriş Yap</Button>
    </Container>
  );
}
