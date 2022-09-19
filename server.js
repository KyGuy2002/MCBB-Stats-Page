// Load Node modules
var express = require('express');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');

// Initialize
var app = express(); // Initialise Express
app.use(express.static(__dirname + '/public')); // Render static files
app.set('view engine', 'ejs'); // Set the view engine to ejs

// Init Body Parser
let encodeURL = bodyParser.urlencoded({ extended: true });
let encodeText = bodyParser.text({ extended: true });
let encodeJSON = bodyParser.json({ extended: true });

// Run website on port
app.listen(8080);



// *** Display Pages ***
// Main Page
app.get('/', function (req, res) {
    res.render('pages/main', {});
});

// Stats Page
app.get('/stats/:username', function (req, res) {
    res.render('pages/stats', { 
        // EJS variable and server-side variable
        username: req.params.username
    });
});



// *** API ***
// Submit name for main page
app.post('/submitName', encodeURL, (req, res) => {
    return res.redirect('/stats/'+req.body["username"]);
});