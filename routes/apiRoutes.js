const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const writtenNotes = require('../db/db.json');
const { response } = require('express');

module.exports = (app) => {
    // reads and returns the notes data from the db.json file
    app.get('/api/notes', (req, res) => {
        fs.readFile(`${__dirname}/../db/db.json`, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    });
    // receives a note and saves it on the request body, adds it to db.json, and returns the new note to the client.
    app.post('/api/notes', (req, res) => {
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
                console.log("Note saved! Yay!")
                res.json(newNote)
            })
        })
    });
};