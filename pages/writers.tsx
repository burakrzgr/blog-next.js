import { collection, getDocs } from 'firebase/firestore';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { database } from '../config/firebase-config';
import styles from '../styles/Home.module.css'


const dbInstance = collection(database, 'writers');

export default function Writers ({}) {
    const [writers, setWriters] = React.useState<{load:boolean,users:any[]}>({load:false,users:[]});
    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getDocs(dbInstance)
            .then((data) => {
                
                //data.docs.map(x => console.log({...x.data(),community:{...x.data().community, comments: [...x.data().community.comments.value] }} as Blog));
                setWriters({load:true,users:data.docs.map(x => { return {writerId:x.id,...x.data()} as any })});
            });
    }
  return (
    <main className={styles.main} >
        <Container className={styles.container}>
            <h3>List of Writers</h3>
            {writers.users.map((x,k) => {return (<div key={k}>
                    <Row className={styles.myborder + ' border '}>
                        <Col sm={12} lg={6}>{x.writerId}</Col>
                        <Col sm={12} lg={6}>{x.nickname}</Col>
                    </Row>
            </div>)})}
        </Container>
    </main>
  );
}