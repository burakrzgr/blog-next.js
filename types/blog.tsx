export type Blog = {
    header : string,
    writer:string,
    content : string,
    community:CommunityInfo
}


export type CommunityInfo = {
    likes : number,
    loves: number,
    dislikes : number,
    comments : Comment[]
}

export type Comment ={
    writer :string,
    content:string,
    date : Date
}
export type CreateBlog = {
    header : string,
    content : string,
    anon : boolean
}