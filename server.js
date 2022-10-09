// Load Node modules
import express from 'express';
import ejs from 'ejs';
import pipeline from 'stream';
import got from 'got';
import bodyParser from 'body-parser';
import * as skinview3d from "skinview3d";

// Initialize
var app = express(); // Initialise Express
app.use(express.static('public')); // Render static files
app.set('view engine', 'ejs'); // Set the view engine to ejs

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Run website on port
app.listen(8080);


// Temp API
app.get('/topPlayers', (req, res) => {
    var top_players = [
        {name:'IEatBeans',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},
        {name:'Chacos5',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},
        {name:'TheDisneyMC',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},
        {name:'TheDisneyMC',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},
        {name:'TheDisneyMC',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},
        {name:'TheDisneyMC',category:'Most Theme Parks Coins',stat:'Coins',value:'9869',uuid:'910b8e507cc340628f0af9fbd4a9b935'},];
    res.send(top_players);
});
app.get('/:uuid/manhunt/recentGames', (req, res) => {
    var recent_games = [
        {date:'10/23/22',duration:'1:35:06',role:'Hunter',winner:'Speedrunner',mods:'None'},
        {date:'10/23/23',duration:'1:35:06',role:'Hunter',winner:'Speedrunner',mods:'None'}];
    res.send(recent_games);
});
app.get('/:uuid/manhunt/otherStats', (req, res) => {
    var other_stats = [
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},];
    res.send(other_stats);
});
app.get('/:uuid/themeparks/commonStats', (req, res) => {
    var common_stats = [
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},];
    res.send(common_stats);
});
app.get('/:uuid/themeparks/otherStats', (req, res) => {
    var other_stats = [
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},];
    res.send(other_stats);
});




// *** Display Pages ***
// Home Page
app.get('/', function (req, res) {
    res.render('pages/home', {});
});

// Theme parks Page
app.get('/stats/:username/themeparks', function (req, res) {
    res.render('pages/stats/themeparks', {

        // EJS variable and server-side variable
        first_joined: "March 17, 2021",
        last_online: "5 Minutes ago",
        current_loc: "Manhunt: In Game",
        rank: "Squid",
    });
});

// Manhunt Page
app.get('/stats/:username/manhunt', function (req, res) {
    res.render('pages/stats/manhunt', {

        // EJS variable and server-side variable
        first_joined: "March 17, 2021",
        last_online: "5 Minutes ago",
        current_loc: "Manhunt: In Game",
        rank: "Squid",
    });
});