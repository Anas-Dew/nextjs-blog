// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default async function handler(req, res) {
    let data = await fs.promises.readdir("blog_data")
    let myblog;
    let allBlogs = [];

    for (let index = 0; index < data.length; index++) {
        const blogItem = data[index];
        myblog = await fs.promises.readFile(('blog_data/' + blogItem), 'utf-8')
        allBlogs.push(JSON.parse(myblog))
        
    }
    res.status(200).json(allBlogs)

    // ----------------
    // fs.readdir(`blog_data`, (err, data) => {
    //     if (err) {
    //         return res.status(500).json({ error: err.errno })
    //     }
    //     res.status(200).json(data);
    // })
}
