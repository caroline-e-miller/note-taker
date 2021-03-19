const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const writtenNotes = require('../db/db.json');
const { response } = require('express');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    });

    app.post('/api/notes', (req, res) => {
        // `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you).
        const newNote = req.body;
        newNote.id = uuidv4();
        console.log(newNote);

        fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
            if (err) throw err;

            let savedNotes = JSON.parse(data);
            console.log(savedNotes)
            savedNotes.push(newNote);
            fs.writeFile(`${__dirname}/../db/db.json`, JSON.stringify(savedNotes), (err, data) => {
                if (err) throw err
                console.log("Note saved!")
                res.json(newNote)
            })
            // res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.end(data);
        })
        // the code below is trash, I just don't know how to push the new note to the JSON file
        // db.json.push(newNote);
        // res.json(newNote);
    });
};