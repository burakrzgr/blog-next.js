export type Blog = {
    blogId: string,
    header: string,
    writer: any,
    content: string,
    community: CommunityInfo
}


export type BlogWriter = {
    username:string,
    image:string,
    color:string
}

export type CommunityInfo = {
    likes: number,
    loves: number,
    dislikes: number,
    comments: any
}

export type Comment = {
    writer: string,
    content: string,
    date: any
}
export type CreateBlog = {
    header: string,
    content: string,
    anon: boolean,
    writer: any
}