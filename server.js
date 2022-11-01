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

app.get('/api/leaderboard-list/', (req, res) => {
    var lbs = [
        {name: 'Themeparks',
        individuals: [
            {name:'Coins', lb_id:'coins', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
            {name:'Distance Walked', lb_id:'walked', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
        ],
        groups: [
            {name:'Rides', description:'View players with the most coins!', image:'/assets/images/themeparks.png', lbs:[
                {name:'Space Mountain', lb_id:'rides_sm'},
                {name:'Rollercoaster', lb_id:'rides_rc'},
            ]},
            {name:'Games', description:'View players with the most coins!', image:'/assets/images/themeparks.png', lbs:[
                {name:'Ring Toss', lb_id:'games_rt'},
                {name:'Other 1', lb_id:'games_1'},
                {name:'Other 2', lb_id:'games_2'},
            ]},
        ]},

        {name: 'Creative',
        individuals: [
            {name:'Plots', lb_id:'coins', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
            {name:'Coins', lb_id:'walked', description:'View players with the most coins!', icon:'icon fa-solid fa-coins', icon_color:'rgb(255, 230, 0)', image:'/assets/images/themeparks.png'},
        ],
        groups: [
            {name:'Rating', description:'View players with the most coins!', image:'/assets/images/themeparks.png', lbs:[
                {name:'Space Mountain', lb_id:'rides_sm'},
                {name:'Rollercoaster', lb_id:'rides_rc'},
            ]},
            {name:'Plot Details', description:'View players with the most coins!', image:'/assets/images/themeparks.png', lbs:[
                {name:'Ring Toss', lb_id:'games_rt'},
                {name:'Other 1', lb_id:'games_1'},
                {name:'Other 2', lb_id:'games_2'},
            ]},
        ]},
    ];

    res.send(lbs);
});

app.get('/api/leaderboard/:lbid', (req, res) => {
    let amount = req.query.amount;
    let start = req.query.start;
    if (!amount) amount = 20;
    var lb_data = {
        name:'Theme Parks Coins Leaderboard', 
        description:'Theme parks coins are the currency used throughout all parks.  They can be used for shop items and more!  Earn coins through rides, games, and other activities.',
        data:[
        {pos: '1', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'63',label:'Coins'},
        {pos: '2', uuid:'08f50e03-98e7-477f-a885-f171bad42fef',username:'Xx_PeeWee38458_xX',value:'62',label:'Coins'},
        {pos: '3', uuid:'afded74e-ba7e-4f35-b8ca-2365879e732d',username:'Chacos5',value:'61',label:'Coins'},
        {pos: '4', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'60',label:'Coins'},
        {pos: '5', uuid:'afded74e-ba7e-4f35-b8ca-2365879e732d',username:'Chacos5',value:'55',label:'Coins'},
        {pos: '6', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'40',label:'Coins'},
        {pos: '7', uuid:'08f50e03-98e7-477f-a885-f171bad42fef',username:'IEatBeans',value:'26',label:'Coins'},
        {pos: '8', uuid:'afded74e-ba7e-4f35-b8ca-2365879e732d',username:'IEatBeans',value:'21',label:'Coins'},
        {pos: '9', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'18',label:'Coins'},
        {pos: '10', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'16',label:'Coins'},
        {pos: '11', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'13',label:'Coins'},
        {pos: '12', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'10',label:'Coins'},
        {pos: '13', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'10',label:'Coins'},
        {pos: '14', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'10',label:'Coins'},
        {pos: '15', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'7',label:'Coins'},
        {pos: '16', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'6',label:'Coins'},
        {pos: '17', uuid:'910b8e50-7cc3-4062-8f0a-f9fbd4a9b935',username:'IEatBeans',value:'4',label:'Coins'},]
    };

    lb_data['data'] = lb_data['data']
    .slice(start, lb_data['data'].length) // Remove first to meet start
    .slice(0, amount) // Remove last to meet length
    res.send(lb_data);
});




// *** Display Pages ***
// Home Page
app.get('/', function (req, res) {
    res.render('pages/home', {});
});

// Leaderboard List Page
app.get('/leaderboard', function (req, res) {
    res.render('pages/leaderboards/leaderboard-list');
});

// Leaderboard List Page
app.get('/leaderboard/:lbid', function (req, res) {
    res.render('pages/leaderboards/leaderboard');
});

// Theme Parks Page
app.get('/stats/:username/themeparks', function (req, res) {
    res.render('pages/stats/themeparks');
});

// Manhunt Page
app.get('/stats/:username/manhunt', function (req, res) {
    res.render('pages/stats/manhunt');
});