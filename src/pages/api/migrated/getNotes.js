// Get the notes from the database

// Import db
import executeQuery from '../../lib/db';

export default function handler(req, res) {

    // Get data submitted in request's body.
    //const body = req.body;

    // Get from the database. Should check for errors here.

    executeQuery({
        query: 'SELECT * FROM Notes WHERE ObjectID = ?',
        values: [0],
    }).then(results => {
        console.log("I RAN")
        console.log(results)
        // Sends a HTTP success code
        res.status(200).json({ results });
      }).catch(error => {
        // Sends a HTTP bad request code
        res.status(400).json({ error });
      });
}