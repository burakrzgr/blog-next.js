import { Button, Stack } from 'react-bootstrap';
import { useAuth } from '../context/auth-context';


export default function FollowerAction ({writerUserId}:{writerUserId:string}) {
    const { user } = useAuth();
    return (
    <Stack direction="horizontal">
        <div className="link-info" role="button">0 kişi takipçisi</div><div className="ms-4 link-info" role="button">0 kişiyi takipte</div>
        {writerUserId === user.uid?<></>:<Button size="sm" variant="danger" className="ms-auto" role="button">Takibe Al</Button>}
    </Stack>
  );
}
