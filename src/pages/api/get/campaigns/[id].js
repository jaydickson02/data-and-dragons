// Get the notes from the database

// Import db
import executeQuery from '@lib/db';

export default async function handler(req, res) {
    const { id } = req.query;
    let queryText;
    let values;

    if (!id) {
        queryText = 'SELECT * FROM Campaigns';
        values = [];
    } else {
        queryText = 'SELECT * FROM Campaigns WHERE ID = ?';
        values = [id];
    }

    try {
        const results = await executeQuery({
            query: queryText,
            values: values,
        });

        return res.status(200).json({ data: results });
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching campaigns:', error);

        // Sends a HTTP bad request code
        return res.status(400).json({ data: error.message });
    }
}