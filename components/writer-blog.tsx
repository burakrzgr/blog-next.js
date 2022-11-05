import { query, where } from 'firebase/firestore';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Blog, BlogWriter } from '../types/blog';
import ShowBlog from './show-blog';



export default function WriterBlog ({writer}: {writer:BlogWriter}) {
    const [blogs, setBlogs] = useState<{load:boolean,message:string,blog:Blog[]}>({load:false,message:'',blog:[]});

    useEffect(() => {
        let q2 = query(dbInstance,where(documentId(),'in',writer.blogs))
        getDocs(q2).then((dat2) => {
            setBlogs({load:true,message:'',blog:dat2.docs.map(x => { 
                return {blogId:x.id,...x.data()} as Blog })});
        });
    
    }, [third])
    


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
