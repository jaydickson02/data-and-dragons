//TODO: Migrate this to /api/edit/character/

//Import db
import executeQuery from '../../lib/db';

export default function updateNote(req, res) {
  // Get data submitted in request's body.
  const body = req.body;
 
  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.content || !body.id) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Some values are missing.' });
  }

  //Update a note given an ID
  executeQuery({
    query: 'UPDATE Notes SET Content = ?, Session = ? WHERE ID = ?',
    values: [body.content, body.session, body.id],
    }).then(results => {
      // Sends a HTTP success code
      res.status(200).json({ status: 200, affectedRows: results.affectedRows });
    }).catch(() => {
      // Sends a HTTP bad request code
      res.status(400).json({ status: 400, affectedRows: results.affectedRows });
    });

}