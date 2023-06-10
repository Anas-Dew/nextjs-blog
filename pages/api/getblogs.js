// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import * as fs from 'fs';

// export default async function handler(req, res) {
//     let data = await fs.promises.readdir("blog_data")
//     let myblog;
//     let allBlogs = [];

//     for (let index = 0; index < data.length; index++) {
//         const blogItem = data[index];
//         myblog = await fs.promises.readFile(('blog_data/' + blogItem), 'utf-8')
//         allBlogs.push(JSON.parse(myblog))
        
//     }
//     res.status(200).json(allBlogs)

    // ----------------
    // fs.readdir(`blog_data`, (err, data) => {
    //     if (err) {
    //         return res.status(500).json({ error: err.errno })
    //     }
    //     res.status(200).json(data);
    // })
// }

///////////////////NEW
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = 'mongodb+srv://public_user:me0IUpVVaY1PmvWV@copywordbase.pya1y.mongodb.net/ai_blog?retryWrites=true&w=majority'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('ai_blog'); // Replace 'your_database_name' with your actual database name
    const collection = db.collection('ai_blogs'); // Replace 'ai_blogs' with your actual collection name

    const allBlogs = await collection.find().toArray();

    res.status(200).json(allBlogs.reverse());
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Error fetching blogs' });
  } finally {
    await client.close();
  }
}

