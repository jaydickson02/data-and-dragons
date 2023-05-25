//Import db
import executeQuery from '../../../lib/db';

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;
 
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body);
 
  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.name || !body.campaignID || !body.class || !body.background || !body.characterType || !body.image) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Some values are missing.' });
  }
 
  // Found the name.
  let player;
  //Check body.player if NPC Set to false else set to true
  if (body.characterType == "NPC") {
    player = false;
  } else {
    player = true;
  }

  if (!body.playerName) {
    body.playerName = "DM";
  }


  // Insert into database. Should check for errors here.
  executeQuery({
    query: 'UPDATE Characters SET CampaignID = ?, Name = ?, Image = ?, Class = ?, Background = ?, Player = ?, PlayerName = ?, Level = ?, Affiliation = ?, Alignment = ?, Status = ?, Race = ?, Location = ? WHERE ID = ?',
    values: [body.campaignID, body.name, body.image, body.class, body.background, player, body.playerName, body.level, body.affiliation, body.alignment, body.status, body.race, body.location, body.id],
  });



  // Sends a HTTP success code
  res.status(200).json({ data: `Character added. Name: ${body.name}, Class: ${body.class}, Type: ${body.characterType}` });
}