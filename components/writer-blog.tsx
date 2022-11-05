import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { Blog, BlogWriter } from '../types/blog';
import ShowBlog from './show-blog';

const dbInstance = collection(database, 'blogs');

export default function WriterBlog ({writer}: {writer:BlogWriter}) {
    const [blogs, setBlogs] = useState<{load:boolean,message:string,blog:Blog[]}>({load:false,message:'',blog:[]});
    useEffect(() => {
        if(writer.blogs.length>0){
            let q2 = query(dbInstance,where(documentId(),'in',writer.blogs))
            getDocs(q2).then((dat2) => {
                setBlogs({load:true,message:'',blog:dat2.docs.map(x => { 
                    return {blogId:x.id,...x.data()} as Blog })});
            });
        }
    }, [writer.blogs])
    
    return (
        <>
            {blogs.load?
                <>
                <div>{blogs.message}</div>
                {blogs.blog.map((blog, key) => {
                    return (
                        <div className="pb-5" key={key}>
                            <ShowBlog blog={blog}></ShowBlog>
                        </div>
                    );
                })}
                </>
            :<h3 className="text-center">Az bi bekle. Yüklüyoz.</h3>}
        </>
    );
}
