// pages/api/updateCharacter.js

import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = req.body;
  console.log('body: ', body);

  // Check for required fields
  if (!body.Name || !body.CampaignID || !body.Class || !body.Background || !body.characterType || !body.Image) {
    console.log('Missing required fields');

    // Check for missing values and log them
    if (!body.Name) console.log('Name is missing');
    if (!body.CampaignID) console.log('CampaignID is missing');
    if (!body.Class) console.log('Class is missing');
    if (!body.Background) console.log('Background is missing');
    if (!body.characterType) console.log('CharacterType is missing');
    if (!body.Image) console.log('Image is missing');
  
    return res.status(400).json({ data: 'Some values are missing.' });
  }

  let player = body.characterType !== "NPC";

  if (!body.playerName) {
    body.playerName = "DM";
  }

  try {
    const results = await executeQuery({
      query: 'UPDATE Characters SET CampaignID = ?, Name = ?, Image = ?, Class = ?, Background = ?, Player = ?, PlayerName = ?, Level = ?, Affiliation = ?, Alignment = ?, Status = ?, Race = ?, Location = ? WHERE ID = ?',
      values: [body.CampaignID, body.Name, body.Image, body.Class, body.Background, player, body.PlayerName, body.Level, body.Affiliation, body.Alignment, body.Status, body.Race, body.Location, body.ID],
    });
    console.log('Update results: ', results);
    res.status(200).json({ status: 200, affectedRows: results.affectedRows });
  } catch (error) {
    console.error('Database query failed: ', error);
    res.status(500).json({ message: 'Database query failed', error });
  }
}