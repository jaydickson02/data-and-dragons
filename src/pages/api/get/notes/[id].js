import executeQuery from '@lib/db';

export default async function handler(req, res) {
    try {
        const { id } = req.query;

        // Check that required fields are not empty.
        if (!id) {
            return res.status(400).json({ data: 'Missing required fields.' });
        }

        const results = await executeQuery({
            query: 'SELECT * FROM Notes WHERE ObjectID = ? ORDER BY Session ASC',
            values: [id],
        });

        return res.status(200).json({ data: results });
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching notes:', error);

        // Sends a HTTP bad request code
        return res.status(400).json({ data: error.message });
    }
}