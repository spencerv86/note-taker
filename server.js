// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

//Set up Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Set up the Express ap to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// API ROUTES
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {
    fs.readFile(__dirname + "/db/db.json", function(err, data) {
        if (err) throw err;
        const currentNotesDB = JSON.parse(data);
        console.log(currentNotesDB);

        const addedNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };
        console.log(addedNote);

        currentNotesDB.push(addedNote);

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(currentNotesDB), (err) => {
            if (err) throw err;
            console.log("This file has been saved!");
        });

        res.json(currentNotesDB);
        // res.json(notesDB);
    })
});

app.delete("/api/notes/:id", function(req, res) {
    const selectedNote = req.params.id;
    
    fs.readFile(__dirname + "/db/db.json", function(err, data) {
        if (err) throw err;

        const currentNotesDB = JSON.parse(data);
        const notesRemaining = currentNotesDB.filter(function(note) {
            return note.id !== selectedNote;
        });

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notesRemaining), (err) => {
            if (err) throw err;
            console.log("This note has been deleted.");
        });

        res.json(notesRemaining);
    });






})



// HTML ROUTES
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Start the server

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});