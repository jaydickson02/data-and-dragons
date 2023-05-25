// pages/api/save-content.js

import executeQuery from '../../../lib/db';

export default function handler(req, res) {
    const body = req.body;
    // Save the content to a database or a file

    executeQuery({
        query: 'INSERT INTO Notes (Content, ObjectID, Session) VALUES (?, ?, ?)',
        values: [body.content, body.objectID, body.session],
        });

    res.status(200).json({ message: 'Content saved successfully' });
  }
  