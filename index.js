// Import database driver
const dbDriver = require('better-sqlite3');

// Connect to db
const db = dbDriver('bands.sqlite3');

// Import express
const express = require('express');

// Create express app
const app = express();

// configure express
app.use(express.static('frontend')); // serve frontend
app.use(express.json());             // Use JSON

/* Building the Rest API */

// Get all
app.get('/bands',(req,res) => {
    // Query all bands
    const bands = db.prepare('SELECT * FROM bands').all();

    // Return bands in JSON
    res.json(bands);
});

// Get one
app.get('/bands/:id',(req,res) => {
    // Get single band from url parameter
    const band = db.prepare('SELECT *FROM bands WHERE id =?').get(req.params.id);
    // Return json or error
    res.json(band || {error: 'No such band'});
});
// Create new band -Post
app.post('/bands',(req,res) =>{
    // Log out to the console
    console.log(req.body);
    
    // Get name and genre from request body
    const name = req.body.name;
    const genre=req.body.genre;

    // Query the database
    const statement = db.prepare('INSERT INTO bands (name,genre) VALUES(?,?)')
    const result = statement.run(name,genre);
    res.json(result);
});

/* Start the app */
app.listen(3000,() => {console.log('Server started on port 3000')});