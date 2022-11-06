import { Button, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { database } from '../config/firebase-config';
import { count } from 'console';

export default function FollowerAction ({writerUserId}:{writerUserId:string}) {
    const [followInfo, setFollowInfo] = useState({load:false,follower:0,following:0});
    useEffect(() => {
        let q = query(collection(database, 'writers'), where("follower", '==', writerUserId));
        const snapshot = getCountFromServer(q);
        
        snapshot.then((x) => {
            setFollowInfo({...followInfo,following:x.data().count});
        })
        
        //console.log('count: ', snapshot.data().count);

    }, [writerUserId])
    
    const { user } = useAuth();
    return (
    <Stack direction="horizontal">
        <div className="link-info" role="button">0 kişi takipçisi</div><div className="ms-4 link-info" role="button">0 kişiyi takipte</div>
        {writerUserId === user.uid?<></>:<Button size="sm" variant="danger" className="ms-auto" role="button">Takibe Al</Button>}
    </Stack>
  );
}
