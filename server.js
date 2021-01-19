// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//Set up Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Set up the Express ap to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// API ROUTES
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// HTML ROUTES
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

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