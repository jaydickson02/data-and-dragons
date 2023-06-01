// Get the notes from the database

// Import db
import executeQuery from '@lib/db';

export default function handler(req, res) {

    // Get data in the url
    const { id } = req.query;
    

    // Check that required fields are not empty.
    if (!id) {
        queryText = 'SELECT * FROM Campaigns';
    } else {
        queryText = 'SELECT * FROM Campaigns WHERE ID = ?';
    }

    executeQuery({
        query: queryText,
        values: [id],
    }).then(results => {

        res.status(200).json({ data: results})

      }).catch(error => {
        // Sends a HTTP bad request code
        res.status(400).json({ data: error });
      });
}