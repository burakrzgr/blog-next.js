import React, { useState,useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Button, ButtonGroup, Container, Form, InputGroup } from "react-bootstrap";
import ShowBlogList, {ShowBlogProps} from "../../components/show-blog-list";
import styles from '../../styles/Home.module.css';
import { collection, getDocs, query, startAt, where } from "firebase/firestore";
import { database } from "../../config/firebase-config";
import { Blog } from "../../types/blog";

const dbInstance = collection(database, 'blogs');

export default function SearchPageKeyword({ }) {
    const router = useRouter();
    const { text } = router.query;
    const [seachText, setSearchText] = React.useState(text as string);
    const [blogs, setBlogs] = useState<ShowBlogProps>({load:false,blog:[]});
    useEffect(() => {
        
        getDocs(dbInstance).then((dat2) => {
            let list = dat2.docs.map(x => {
                return { blogId: x.id, ...x.data() } as Blog});
            setBlogs({load: true, blog: list.filter(x => {return x.header.includes(text as string) || x.writer.username.includes(text as string)})});
            });
    }, [text])
    
    return (
        <main className={styles.main} >
            <Container className={styles.container}>
                <form className="w-100" onSubmit={(e) => { e.preventDefault(); Router.push(`/search/${encodeURIComponent(seachText)}`) }}>              
                    <InputGroup className="w-100">
                        <Form.Control autoFocus type="text" size="lg" placeholder="Blogları yada yazarları arayın..." value={seachText} onChange={e => setSearchText(e.target.value)}></Form.Control>
                        <Button variant="secondary" className="ps-4 pe-4" size="lg" type="submit" >Ara</Button>
                    </InputGroup>
                </form>
                <br />
                <h5>{"Arama metini \""}{text}{"\" için "}{blogs?.blog?.length??0} sonuç bulundu.</h5>
                <br className="mb-5"/>
                <ShowBlogList blogs={blogs}></ShowBlogList>
            </Container>
        </main>
    );
}
