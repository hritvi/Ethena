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
    res.render('register');
});

app.post('/submit',(req, res) => {
    userData = {'id': req.body['userid'], 'name': req.body['username'], 'prisma': req.body['prisma']}
    issueModel.addIssue(req.body['issue'], req.body['userid'], req.body['handle'])
    .then((data) => {
        res.render('home',{data, 'user':userData});
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
    userModel.authenticate(req.body['username'], req.body['password'])
    .then((user) => {
        userData = user;
        return userModel.getPrisma(user.id);
    })
    .then((prisma) => {userData['prisma'] = prisma;})
    .then(() => issueModel.list())
    .then((data)=>{
        console.log(data)
        res.render('home',{data, 'user':userData});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/leaderboard', (req, res) => {
    var voteData;
    issueModel.listVotes()
    .then((data) => {
        console.log(data);
        data.sort();
        voteData = data;
     // res.render('leaderboard', {data})
    })
    .then(() => prismaModel.listPrismas())
    .then((data) => {
        console.log(data)
        console.log("now here is the vote data")
        console.log(voteData)
        data.sort();
        res.render('leaderboard', {data, voteData })
    })
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    userModel.insert(req.body, res)
    .then(() => {
        res.send("You have been successfully registered");
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
