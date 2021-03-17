const fs = require('fs');
const writtenNotes = require('./db/db.json');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(db.json));

    app.post('/api/notes', (req, res) => {

        fs.writeFile('../db/db.json', data, (err) => {
            if (err) throw err;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    });
};