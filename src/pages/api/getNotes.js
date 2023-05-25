// Get the notes from the database

// Import db
import executeQuery from '../../../lib/db';

export default function handler(req, res) {

    // Get data submitted in request's body.
    const body = req.body;
    
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body);
    
    // Guard clause checks for values,
    // and returns early if they are not found
    if (!body.objectID) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Some values are missing.' });
    }

    // Get from the database. Should check for errors here.

    executeQuery({
        query: 'SELECT * FROM Notes WHERE ObjectID = ?',
        values: [body.objectID],
    }).then(results => {
        // Sends a HTTP success code
        res.status(200).json({ data: results });
    });
}