import executeQuery from '@lib/db';

export default function handler(req, res) {
    const body = req.body;

    // Check that required fields are not empty.
    //TODO: Fix this. For some reason even though the fields are there its still terminating.
    //console.log("BODY: " + body.content + " " + body.objectID + " " + body.session)
    // if (!body.content || !body.objectID || !body.session) {
    //     console.log("I RAN ME! 6");
    //     res.status(400).json({ data: 'Missing values' });
    //     return;
    // }

    executeQuery({
        query: 'INSERT INTO Notes (Content, ObjectID, Session) VALUES (?, ?, ?)',
        values: [body.content, body.objectID, body.session],
        }).then(results => {
            res.status(200).json({ data: results})
    
          }).catch(error => {
            // Sends a HTTP bad request code
            res.status(400).json({ data: error });
          });
    }



