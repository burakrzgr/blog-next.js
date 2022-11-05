import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { Blog } from '../types/blog';
import ShowBlog from './show-blog';
import ShowBlogList, { ShowBlogProps } from './show-blog-list';

const dbInstance = collection(database, 'blogs');

export default function ProfileWriter ({blogs:blogprop}: {blogs?:string[]}) {
    const [blogs, setBlogs] = useState<ShowBlogProps>({load:false,blog:[]});
    useEffect(() => {
        if(blogprop)
            if(blogprop.length>0){
                let q2 = query(dbInstance,where(documentId(),'in',blogprop))
                getDocs(q2).then((dat2) => {
                    setBlogs({load:true,blog:dat2.docs.map(x => { 
                        return {blogId:x.id,...x.data()} as Blog })});
                });
            }
            else{
                setBlogs({load:true,message:'Burda bişey yok :/',blog:[]});
            }
    }, [blogprop])
    
    return (
        <>
            <ShowBlogList blogs={blogs}></ShowBlogList>
        </>
    );
}
