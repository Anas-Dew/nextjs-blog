import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;
  const uri = 'mongodb+srv://public_user:me0IUpVVaY1PmvWV@copywordbase.pya1y.mongodb.net/ai_blog?retryWrites=true&w=majority'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('ai_blog'); // Replace 'your_database_name' with your actual database name
    const collection = db.collection('ai_blogs'); // Replace 'ai_blogs' with your actual collection name

    const blog = await collection.findOne({ slug: slug });

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found.' });
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Error fetching blog' });
  } finally {
    await client.close();
  }
}
