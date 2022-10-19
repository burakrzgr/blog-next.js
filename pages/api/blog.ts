import { Blog, CreateBlog } from './../../types/blog';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

var blogs: Blog[] = [{ content: "Yapılanlar; Blok Yazma, Blog Okuma, Tema\nYapılacaklar; Blog kaydetme, Resim Yükleme,Yorum Yazma", header: "Başlık", writer: "Burak Rüzgar", community: { likes: 5, loves: 8, dislikes: 2, comments: [] } }];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Blog[]>
) {
    if (req.method === 'POST') {
        let data:CreateBlog = req.body;
        let pushed = blogs.push({content:data.content,header:data.header,writer:data.anon?"Anonymous":"Burak Rüzgar",community:{likes:0,dislikes:0,loves:0,comments:[]}});
        res.status(200).send([blogs[pushed]]);
    }
    else if ( req.method === 'GET' ) {
        res.status(200).json(blogs);
    }
}
