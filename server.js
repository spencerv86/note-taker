// Dependencies
const express = require("express");

//Set up Express app
const app = express();
const PORT = 8080;

// Set up the Express ap to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
