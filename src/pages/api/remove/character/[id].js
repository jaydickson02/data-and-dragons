// Get the notes from the database

// Import db
import executeQuery from '@lib/db';

export default function handler(req, res) {

    // Get data in the url
    const { id } = req.query;
    
    // Check that required fields are not empty.
    if (!id) {
        res.status(400).json({ data: 'Missing required fields.' });
    }

    executeQuery({
        query: 'DELETE FROM Characters WHERE ID = ?',
        values: [id],
    }).then(results => {

        res.status(200).json({ data: results})

      }).catch(error => {
        // Sends a HTTP bad request code
        res.status(400).json({ data: error });
      });
}