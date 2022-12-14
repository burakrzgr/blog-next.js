import { Button, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { database } from '../config/firebase-config';
import { followUser, unfollowUser } from '../utils/followActions';

export default function FollowerAction ({writerUserId}:{writerUserId:string}) {
    const { user } = useAuth();
    const [followInfo, setFollowInfo] = useState<{follower:number,followed:number,youFollow?:boolean}>({follower:0,followed:0,youFollow:undefined});
    

    useEffect(() => { 
        async function findFollower(column:string) {
            let q = query(collection(database, 'favs'), where(column, '==', writerUserId));
            const snapshot = getCountFromServer(q);
            return (await snapshot).data().count;
        }
        
        async function findIfYouFollow() {
            if (user.writerId) {
                let q = query(collection(database, 'favs'), where('followed', '==', writerUserId), where('follower', '==', user.writerId));
                const snapshot = getCountFromServer(q);
                return (await snapshot).data().count > 0;
            }
            else return false;
        }
        if(user.writerId && writerUserId){
            (async () => {
                let follower = await findFollower('follower');
                let followed = await findFollower('followed');
                let youFollow = user.writerId !== writerUserId ? await findIfYouFollow() : undefined;
                setFollowInfo({ follower, followed, youFollow });
            })();
        }
    }, [user.writerId, writerUserId])

    return (
    <Stack direction="horizontal" style={{minHeight:"6rem"}}>
        {<div className="link-info" role="button">{followInfo.followed} kişi takipçisi</div>}
        {<div className="ms-4 link-info" role="button">{followInfo.follower} kişiyi takipte</div>}
        {followInfo.youFollow != undefined?
            (followInfo.youFollow?
                <Button size="sm" variant="danger" className="ms-auto" role="button" onClick={() => 
                    {
                        unfollowUser(writerUserId,user.writerId);
                        setFollowInfo({...followInfo,youFollow:false});
                    }}>Takipten Çık</Button>:
                <Button size="sm" variant="danger" className="ms-auto" role="button" onClick={() => 
                    {
                        followUser(writerUserId,user.writerId);
                        setFollowInfo({...followInfo,youFollow:true});
                    }}>Takibe Al</Button>
            ):
            <></>}
    </Stack>
  );
}
