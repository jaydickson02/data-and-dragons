// pages/api/save-content.js

import executeQuery from '../../lib/db';

export default function handler(req, res) {
    const body = req.body;
    // Save the content to a database or a file

    console.log(body.content, body.objectID, body.session)

    executeQuery({
        query: 'INSERT INTO Notes (Content, ObjectID, Session) VALUES (?, ?, ?)',
        values: [body.content, body.objectID, body.session],
        }).then(results => {
            // Sends a HTTP success code
            res.status(200).json({ status: 200, affectedRows: results.affectedRows });
          }).catch(() => {
            // Sends a HTTP bad request code
            res.status(400).json({ status: 400, affectedRows: results.affectedRows });
          });


  }
  