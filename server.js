// Load Node modules
import express from 'express';
import ejs from 'ejs';

// Initialize
var app = express(); // Initialise Express
app.use(express.static('public')); // Render static files
app.set('view engine', 'ejs'); // Set the view engine to ejs

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
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
        {stat:'Coins',value:'9869',t_what:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!',t_how:'Earn coins through rides, games, and other activities.'},
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
app.get('/:uuid/generalStats', (req, res) => {
    var general_stats = {first_joined:'January 6th, 2021',last_online:'5 minutes ago',current_loc:'Manhunt: In a game',rank:'Owner'};
    res.send(general_stats);
});

app.get('/api/leaderboard/:lbid', (req, res) => {
    var lb_data = [
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'12',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'6',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'6',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'5',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'5',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'4',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'2',label:'Coins'},
        {uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'1',label:'Coins'},];
    res.send(lb_data);
});




// *** Display Pages ***
// Home Page
app.get('/', function (req, res) {
    res.render('pages/home', {});
});

// Leaderboard List Page
app.get('/leaderboard', function (req, res) {
    res.render('pages/leaderboard-list');
});

// Leaderboard List Page
app.get('/leaderboard/:lbid', function (req, res) {
    res.render('pages/leaderboard');
});

// Theme Parks Page
app.get('/stats/:username/themeparks', function (req, res) {
    res.render('pages/stats/themeparks');
});

// Manhunt Page
app.get('/stats/:username/manhunt', function (req, res) {
    res.render('pages/stats/manhunt');
});