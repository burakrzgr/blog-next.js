import { Badge, Button, Stack } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { BlogWriter } from "../types/blog";
import { InterestDisplay } from "./interest-display";
import ProfilePhotoDisplay from "./profile-photo-display";


export default function ProfileCard ({writer}:{writer:BlogWriter}) {
  const {user} = useAuth();
  return (
    <Stack direction="vertical" gap={3}>
        <div>
            <ProfilePhotoDisplay link={writer.image}></ProfilePhotoDisplay>
        </div>
        <div>
            <div className="text-end">
                {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger' role='button'>Report</Badge>}
            </div>
            <h2>{writer.username}</h2>
        </div>
        <div>
            <InterestDisplay interests={writer.interests}></InterestDisplay>
        </div>
        <div>
            <Stack direction="horizontal">
                <div className="link-info" role="button">0 kişi takipçisi</div><div className="ms-4 link-info" role="button">0 kişiyi takipte</div>
                {writer.userId === user.uid?<></>:<Button size="sm" variant="danger" className="ms-auto" role="button">Takibe Al</Button>}
            </Stack>
        </div>
        <div>
            <h6 className="text-muted">Hakkımda</h6>
            <p>{writer.desc.length>0?writer.desc:<span className="text-muted">Bişey yazmamış :/</span>}</p>
        </div>
    </Stack>
  );
}
