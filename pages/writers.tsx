import { collection, getDocs } from 'firebase/firestore';
import Router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { InterestDisplay } from '../components/interest-display';
import ProfilePhotoDisplay from '../components/profile-photo-display';
import { database } from '../config/firebase-config';
import styles from '../styles/Home.module.css'
import { BlogWriter } from '../types/blog';


const dbInstance = collection(database, 'writers');

export default function Writers ({}) {
    const [writers, setWriters] = useState<{load:boolean,writers:any[]}>({load:false,writers:[]});
    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                setWriters({load:true,writers:data.docs.map(x => { return {id:x.id,...x.data()} as BlogWriter })});
            });
    }
  return (
    <main className={styles.main} >
        <Container className={styles.container}>
            <h2>Yazarlar</h2>
            {writers.writers.map((x,k) => {return (<div key={k}>
                    <Row className='border myborder m-2 p-2'>
                        <Col sm={12} lg={3}>
                            <ProfilePhotoDisplay link={x.image} />
                        </Col>
                        <Col sm={12} lg={7}>
                            <Row><h3>{x.username}</h3></Row>
                            <Row><InterestDisplay interests={x.interests}></InterestDisplay></Row>
                            <Row>{x.desc}</Row>
                        </Col>
                        <Col sm={12} lg={2}>
                            <Button variant="dark" className='w-100 h-100 p-3' onClick={async () => await Router.push(`/writer/${x.id}`)}>Görüntüle</Button>
                        </Col>
                    </Row>
            </div>)})}
        </Container>
    </main>
  );
}
