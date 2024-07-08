// Get the notes from the database

// Import db
import executeQuery from '@lib/db';

export default function handler(req, res) {

    console.log("I RAN")
    // Get data in the query
    const id = req.body.id;
    console.log("ID IS ME: " + id)

    // Check that required fields are not empty.
    if (!id) {
        res.status(400).json({ data: 'Missing required fields.' });
    }
    console.log("I RAN 3")
    executeQuery({
        query: 'Delete from Notes where ID = ?',
        values: [id],
    }).then(results => {
      console.log("I RAN 4")
        res.status(200).json({ data: results})

      }).catch(error => {
        console.log("I RAN 5")
        // Sends a HTTP bad request code
        res.status(400).json({ data: error });
      });
}