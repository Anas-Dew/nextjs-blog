// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// EXAMPLE POINT TO TEST => http://localhost:3000/api/post?slug=how-to-center-a-div
import * as fs from 'fs';

export default function handler(req, res) {
    const slug = req.query.slug;
    fs.readFile(`blog_data/${slug}.json`, 'utf-8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: err.errno, message: "No such blog exists!" })
        }
        res.status(200).json(JSON.parse(data));
    })
}
