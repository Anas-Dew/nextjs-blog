import * as fs from 'fs'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        let directory_length = await fs.promises.readdir('contact_data');

    
        fs.writeFile(`contact_data/contact_${directory_length.length + 1}.json`, JSON.stringify(req.body), ()=> {})
        res.status(200).json({"message": "Contact data saved successfully."});
    } else {
        // Handle any other HTTP method
        res.status(404).json({"message": "Invalid request"});
    }
}