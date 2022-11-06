import { Button, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { database } from '../config/firebase-config';

export default function FollowerAction ({writerUserId}:{writerUserId:string}) {
    const [followInfo, setFollowInfo] = useState<{follower:number,followed:number,youFollow?:boolean}>({follower:0,followed:0,youFollow:undefined});
    
    async function findFollower(column:string) {
        let q = query(collection(database, 'favs'), where(column, '==', writerUserId));
        const snapshot = getCountFromServer(q);
        return (await snapshot).data().count;
        /*snapshot.then((x) => {
            setFollowInfo({...followInfo,[column]:x.data().count});
        });*/
    }
    
    
    
    useEffect(() => {
        findFollower('follower').then(x => {
            //setFollowInfo({ ...followInfo,});
            findFollower('followed').then(y => {
                setFollowInfo({ ...followInfo,  follower: x ,followed: y });
            });
        });
        //findIfYouFollow();
    }, [writerUserId])
    
    const { user } = useAuth();
    return (
    <Stack direction="horizontal">
        {<div className="link-info" role="button">{followInfo.followed} kişi takipçisi</div>}
        {<div className="ms-4 link-info" role="button">{followInfo.follower} kişiyi takipte</div>}
        {followInfo.youFollow != undefined?
            (followInfo.youFollow?
                <Button size="sm" variant="danger" className="ms-auto" role="button">Takipten Çık</Button>:
                <Button size="sm" variant="danger" className="ms-auto" role="button">Takibe Al</Button>
            ):
            <></>}
    </Stack>
  );
}
