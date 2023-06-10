import cron from 'node-cron';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import dJSON from "dirty-json"

async function generateAndStoreBlog() {
  try {
    // Make a request to OpenAI API to generate a blog
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `WRITE A BLOG POST ABOUT [ANY TOPIC ABOUT TECHNOLOGY IN THE TYPE OF (TIPS, TRICKS, HOW TO OR ANY LATEST TECH OR TREND OR SPECIFIC TECHNOLOGY).]. NOTE=>[THE MAIN KEYWORDS OF BLOG MUST BE PRESENT IN THE CONTENT MANY ATLEST 10 TIMES, THE BLOG SHOULD BE MORE THAN 1000 WORDS, PROPERLY DIVIDE CONTENT BETWEEN H1, H2, H3, P, LI, TABLE, OR ANY INFORMATION.] AND RETURN THESE THINGS IN JSON=> {title, slug(title in small latters saparated by hyphen}, content(as html), meta_description, keywords(main keywords of blog).`,
      temperature: 0.9,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    });

    const generatedBlog = response.data.choices[0].text;

    // Store the generated blog in the MongoDB collection
    const uri = 'mongodb+srv://public_user:me0IUpVVaY1PmvWV@copywordbase.pya1y.mongodb.net/ai_blog?retryWrites=true&w=majority'; // MongoDB connection URI
    const client = new MongoClient(uri);

    await client.connect();

    const db = client.db('ai_blog'); // Replace 'ai_blog' with your actual database name
    const collection = db.collection('ai_blogs'); // Replace 'ai_blogs' with your actual collection name

    function checkJsonObject(jsonObj) {
      const requiredFields = ['title', 'content', 'meta_description', 'keywords', 'slug'];
    
      for (const field of requiredFields) {
        if (!(field in jsonObj)) {
          return false;
        }
      }
    
      return true;
    }
    

    try {
      
      // const repaired = jsonrepair(generatedBlog)
      let blog_json = dJSON.parse(generatedBlog)
      let pass = checkJsonObject(blog_json)
      if (pass === true) {
        await collection.insertOne(blog_json);
        console.log('Blog stored successfully.');
      } else {
        console.log("Blog did not passed.")
      }

    } catch (err) {
      console.error(err + generatedBlog)
      generateAndStoreBlog()
    } finally {
      await client.close();
    }


    // try {

    // } catch (error) {
    //   // console.log(error);
    //   console.log("Failed to store blog. Retrying in 15 seconds." + generatedBlog)
    //   // setTimeout(() => {
    //   //   generateAndStoreBlog()
    //   // }, 15000);
    // } finally {
    //   await client.close();
    // }


  } catch (error) {
    // console.error('Error generating and storing blog:', error);
    console.log("Failed to store blog. Retrying in 15 seconds.")
    setTimeout(() => {
      generateAndStoreBlog()
    }, 45000);
  }
}

export default function handler(req, res) {
  // Create a cron job that runs every 15 seconds
  const cronJob = cron.schedule('0 */3 * * *', () => {
    console.log("Cron Job Started.");
    generateAndStoreBlog();
  });

  // Start the cron job
  cronJob.start();

  // Send a response
  res.status(200).json({ message: 'Cron job started successfully.' });
}
