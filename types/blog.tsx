export type Blog = {
    blogId: string,
    header: string,
    writer: any,
    content: string,
    community: CommunityInfo
}


export type BlogWriter = {
    id:string,
    userId:string,
    username:string,
    image:string,
    color:string,
    blogs?:string[],
    interests?:string,
    desc:string,
    gender:Gender
}

export enum Gender {
    Male,
    Female,
    Non,
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
    blogId?:string,
    header: string,
    content: string,
    anon: boolean,
    writer: CreateBlogWriter
}

export type CreateBlogWriter = {
    username: string,
    writerId: string,
    image: string
}