import { collection, getDocs } from 'firebase/firestore';
import Router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { InterestDisplay } from '../components/interest-display';
import ProfilePhotoDisplay from '../components/profile-photo-display';
import { database } from '../config/firebase-config';
import styles from '../styles/Home.module.css'
import { BlogWriter, Gender } from '../types/blog';


const dbInstance = collection(database, 'writers');

export default function Writers ({}) {
    const [writers, setWriters] = useState<{load:boolean,writers:BlogWriter[]}>({load:false,writers:[]});
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
                            <ProfilePhotoDisplay link={x.image} gender={x.gender??Gender.Non} />
                        </Col>
                        <Col sm={12} lg={7} >
                            <Row><h3>{x.username}</h3></Row>
                            <Row className="pt-1 pb-1"><InterestDisplay interests={x.interests}></InterestDisplay></Row>
                            <Row className="pt-1 pb-1"><p>{x.blogs?.length??0} adet blog yazdı.</p></Row>
                            <Row ><div className="overflow-hidden pb-1" style={{height: "5rem"}}>{x.desc}</div></Row>
                        </Col>
                        <Col sm={12} lg={2}>
                            <Button variant="dark" size='lg' className='w-100 h-100 p-3' onClick={async () => await Router.push(`/writer/${x.id}`)}>Görüntüle</Button>
                        </Col>
                    </Row>
            </div>)})}
        </Container>
    </main>
  );
}
