import { Badge, Stack } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { BlogWriter } from "../types/blog";
import { InterestDisplay } from "./interest-display";


export default function ProfileCard ({writer}:{writer:BlogWriter}) {
  const {user} = useAuth();
  return (
    <Stack direction="vertical" gap={3}>
        <div>
            <div className="text-end">
                {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger'>Report</Badge>}
            </div>
            <h2>{writer.username}</h2>
        </div>
        <div>
            <InterestDisplay interests={writer.interests}></InterestDisplay>
        </div>
        <div>
            <h6 className="text-muted">Hakkımda</h6>
            <p>{writer.desc.length>0?writer.desc:<span className="text-muted">Bişey yazmamış :/</span>}</p>
        </div>
    </Stack>
  );
}
