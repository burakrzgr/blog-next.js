import React from 'react'
import { Blog } from '../types/blog'
import ShowBlog from './show-blog'

export type ShowBlogProps = {
    load: boolean, 
    message?: string, 
    blog: Blog[]
}

const ShowBlogList = ({blogs}: {blogs:ShowBlogProps}) => {
  return (
    <>
        {blogs.load ?(
                blogs.message?
                    <h2 className="text-center mt-5">{blogs.message}</h2>:
                    <>
                        {blogs.blog.map((blog, key) => {
                            return (
                                <div className="pb-5" key={key}>
                                    <ShowBlog blog={blog}></ShowBlog>
                                </div>
                            );
                        })}
                    </>)
            :<h2 className="text-center mt-5">Az bi bekle. Yüklüyoz.</h2>}
    </>
  )
}
export default ShowBlogList;