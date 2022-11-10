import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Badge, Button, Form, Stack } from "react-bootstrap";
import { database } from "../config/firebase-config";
import { useAuth } from "../context/auth-context";
import { BlogWriter } from "../types/blog";
import FollowerAction from "./follower-action";
import { InterestDisplay } from "./interest-display";
import ProfilePhotoDisplay from "./profile-photo-display";

const dbInstance = collection(database, 'writers');

export default function ProfileCard ({writer}:{writer:BlogWriter}) {
  const {user} = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(writer.desc);
  const saveProfileInfo = (val : string) => {
    setDoc(doc(dbInstance,user.writerId),
        { "desc" : val },
        { merge : true }).then(x => 
            setEditMode(false));
  }

  return (
    <Stack direction="vertical" gap={3}>
        <div>
            <ProfilePhotoDisplay link={writer.image}></ProfilePhotoDisplay>
        </div>
        <div>
            <div className="text-end">
                {writer.userId === user.uid?
                    (editMode?
                        <Badge bg='success' role='button' onClick={() => saveProfileInfo(writer.desc)}>Düzenlemeyi Kaydet</Badge>:
                        <Badge bg='info' role='button' onClick={() => setEditMode(true)}>Profilini düzenle</Badge>):
                    <Badge bg='danger' role='button'>Kullanıcıyı Şikayet Et</Badge>}
            </div>
            <h2>{writer.username}</h2>
        </div>
        <div>
            <InterestDisplay interests={writer.interests}></InterestDisplay>
        </div>
        <div>
            <FollowerAction writerUserId={writer.id}></FollowerAction>
        </div>
        <div>
            <h6 className="text-muted">Hakkımda</h6>
            {editMode?<Form.Control as="textarea" rows={5} value={desc} onChange={(x) => setDesc(x.target.value)}/>:
            <p>{desc.length>0?desc:<span className="text-muted">Bişey yazmamış :/</span>}</p>}
        </div>
    </Stack>
  );
}
