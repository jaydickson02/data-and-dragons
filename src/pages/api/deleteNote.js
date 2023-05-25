
// Get the notes from the database

// Import db
import executeQuery from '../../../lib/db';

export default function deleteNote(req, res) {

    // Get data submitted in request's body.
    const body = req.body;
    
    // Guard clause checks for values,
    // and returns early if they are not found
    if (!body.id) {

        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Some values are missing.' });
    }

    // Get from the database. Should check for errors here.

    executeQuery({
        query: 'DELETE FROM Notes WHERE ID = ?',
        values: [body.id],
    }).then(results => {
        // Sends a HTTP success code
        res.status(200).json({ data: results });

        
    });
}