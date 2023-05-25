//Import db
import executeQuery from '../../../lib/db';

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;
 
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body);
 
  // Guard clause checks for values,
  // and returns early if they are not found
  if (!body.campaignName || !body.about || !body.dmName) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Some values are missing.' });
  }


  // Insert into database. Should check for errors here. Add CoverImage.
  executeQuery({
    query: 'INSERT INTO Campaign (Name, DM, Background) VALUES (?, ?, ?)',
    values: [body.campaignName, body.dmName, body.about],
  });


  // Sends a HTTP success code
  res.status(200).json({ data: `Campaign created. Name: ${body.campaignName}, DM: ${body.dmName}` });
}