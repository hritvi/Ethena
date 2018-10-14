const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname+"/public"))
// let departmentController = require('./controller/departmentController.js')
let userModel = require('./models/userModel.js')
let issueModel = require('./models/issueModel.js')
let prismaModel = require('./models/prismaModel.js')
const bodyParser = require('body-parser');
app.use(bodyParser());
app.set('view engine', 'ejs');
app.get('/',(req, res) => {
    res.render('userLogin');
});

app.post('/submit',(req, res) => {
    var issueData;
    var topVote;
    var topPrisma;
    var rankC;
    userData = {'id': req.body['userid'], 'name': req.body['username'], 'prisma': req.body['prisma']}
    issueModel.addIssue(req.body['issue'], req.body['userid'], req.body['handle'], req.body['username'])
    .then((data) => {
        issueData = data;
        // res.render{'home',{data, 'user':userData}}
    })
    .then(() => issueModel.listVotesAndRank(req.body['username']))
    .then((dataTemp) => {
        topVote = dataTemp['data'][0];
        rankC = dataTemp['rank'];
        topPost = dataTemp.data2['0'];
        rankB = dataTemp['rank2'];
    })
    .then(() => prismaModel.listPrismasAndRank(req.body['username']))
    .then((dataTemp) => {
        topPrisma =  dataTemp.data[0];
        console.log("prisma data received : "+ dataTemp.data);
        data = issueData;
        rank = dataTemp.rank;
        console.log(rank, rankC);
        res.render('home', {data, 'user':userData, topPrisma, topPost, topVote, rankB, rankC, 'rankA': rank});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/userlogin', (req, res) => {
    res.render('userLogin');
})

app.post('/userlogin', (req, res) => {
    var userData;
    var issueData;
    var topVote;
    var topPrisma;
    var rankC;
    userModel.authenticate(req.body['username'], req.body['password'])
    .then((user) => {
        userData = user;
        return userModel.getPrisma(user.id);
    })
    .then((prisma) => {userData['prisma'] = prisma;})
    .then(() => issueModel.list())
    .then((data)=>{
        console.log(data)
        issueData = data;
        // res.render('home',{data, 'user':userData});
    })
    .then(() => issueModel.listVotesAndRank(req.body['username']))
    .then((dataTemp) => {
        topVote = dataTemp['data'][0];
        rankC = dataTemp['rank'];
        topPost = dataTemp.data2['0'];
        rankB = dataTemp.rank2;
    })
    .then(() => prismaModel.listPrismasAndRank(req.body['username']))
    .then((dataTemp) => {
        topPrisma =  dataTemp.data[0];
        console.log("prisma data received : "+ dataTemp.data);
        data = issueData;
        rank = dataTemp.rank;
        console.log(rank, rankC);
        res.render('home', {data, 'user':userData, topPrisma, topPost, topVote, rankB, rankC, 'rankA': rank});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/leaderboard', (req, res) => {
    var voteData;
    issueModel.listVotes()
    .then(([data, data2]) => {
        console.log(data);
        voteData = data;
        postData = data2;
     // res.render('leaderboard', {data})
    })
    .then(() => prismaModel.listPrismas())
    .then((prismaData) => {
        console.log(prismaData)
        console.log("now here is the vote data")
        console.log(voteData)
        res.render('leaderboard', {prismaData, postData, voteData })
    })
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    userModel.insert(req.body, res)
    .then(() => {
        res.send("You have been successfully registered <a href=" + "/" + ">Login Here</a>");
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
