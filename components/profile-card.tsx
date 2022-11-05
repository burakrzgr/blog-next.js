import { Badge, Stack } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { BlogWriter } from "../types/blog";


export default function ProfileCard ({writer}:{writer:BlogWriter}) {
  const {user} = useAuth();
  return (
    <Stack direction="vertical" gap={3}>
        <div>
            <h2>{writer.username}</h2>
            {writer.userId === user.uid?<Badge bg='info'>Its you :D</Badge>:<Badge bg='danger'>Report</Badge>}
        </div>
        <div>
            
        </div>
        <div>
            <h6 className="text-muted">Hakkımda</h6>
            <p>{writer.desc}</p>
        </div>
    </Stack>
  );
}
