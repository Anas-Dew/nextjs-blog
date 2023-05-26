// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';

export default function handler(req, res) {

    fs.readdir(`blog_data`, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.errno })
        }
        res.status(200).json(data);
    })
}
