// Import db
import executeQuery from '@lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    // Check that required fields are not empty.
    if (!id) {
        return res.status(400).json({ data: 'Missing required fields.' });
    }

    try {
        const results = await executeQuery({
            query: 'SELECT * FROM Characters WHERE CampaignID = ?',
            values: [id],
        });

        return res.status(200).json({ data: results });
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching characters:', error);

        // Sends a HTTP bad request code
        return res.status(400).json({ data: error.message });
    }
}