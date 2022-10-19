import { Blog } from './../../types/blog';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

var blogs:Blog[] = [{ content: "Yapılanlar; Blok Yazma, Blog Okuma, Tema<br />Yapılacaklar; Blog kaydetme, Resim Yükleme,Yorum Yazma", header: "Başlık", writer: "Burak Rüzgar", community: { likes: 5, loves: 8, dislikes: 2, comments: [] } }];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Blog[]>
) {
  res.status(200).json(blogs)
}
