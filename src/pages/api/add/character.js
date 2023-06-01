
//Import db
import executeQuery from '@lib/db';

export default function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body;

    //Set Defaults
    if (!body.class) {
        body.class = "None";
    }

    if (!body.background) {
        body.background = "None";
    }

    if (!body.image) {
        body.image = "dice-black.png";
    }

    if (!body.playerName) {
        body.playerName = "DM";
    }

    if (!body.affiliation) {
        body.affiliation = "None";
    }

    if (!body.location) {
        body.location = "None";
    }

    if (!body.race) {
        body.race = "None";
    }
 
//   // Guard clause checks for first and last name, and returns early if they are not found
//TODO: Fix this.
//   if (!body.name || !body.campaignID || !body.class || !body.background || !body.characterType || !body.image) {
//     // Sends a HTTP bad request error code
//     res.status(400).json({ data: 'Some values are missing.' });
//     return;
//   }
 
  // Found the name.
  let player;

  //Check body.player, if NPC Set to false else set to true
  if (body.characterType == "NPC") {
    player = false;
  } else {
    player = true;
  }

  if (!body.playerName) {
    body.playerName = "DM";
  }


  // Insert into database.
  executeQuery({
    query: 'INSERT INTO Characters (CampaignID, Name, Image, Class, Background, Player, PlayerName, Level, Affiliation, Alignment, Status, Race, Location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    values: [body.campaignID, body.name, body.image, body.class, body.background, player, body.playerName, body.level, body.affiliation, body.alignment, body.status, body.race, body.location],
  }).then(results => {
    res.status(200).json({ data: results })

  }).catch(error => {
    // Sends a HTTP bad request code
    res.status(400).json({ data: error });
  });

}