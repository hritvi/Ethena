const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname+"/public"))
let sentimentController = require('./controller/sentimentController.js')
// let departmentController = require('./controller/departmentController.js')
let departmentModel = require('./models/departmentModel.js')
let complaintModel = require('./models/complaintModel.js')
let trackModel = require('./models/trackModel.js')
let userModel = require('./models/userModel.js')
let issueModel = require('./models/issueModel.js')
const bodyParser = require('body-parser');
app.use(bodyParser());
app.set('view engine', 'ejs');
app.get('/',(req, res) => {
    res.render('home');
});

app.post('/submit',(req, res) => {
    sentimentController.findUrgency(req,res);
})

app.get('/tracking', (req, res) => {
    res.render('tracking');
})

app.post('/tracking', (req, res) => {
    trackModel.getTrack(req.body['track-id'])
    .then(status => res.render('trackDetails', {status}))
    .catch(err => res.send("Error: "+err))
})

app.get('/userlogin', (req, res) => {
    res.render('userLogin');
})

app.post('/userlogin', (req, res) => {
    var userData;
    userModel.authenticate(req.body['username'], req.body['password'])
    .then((user) => {
        userData = user;
        return userModel.getPrisma(user.id)
    })
    .then((prisma) => {userData['prisma'] = prisma;})
    .then(() => issueModel.list())
    .then((data)=>{
        console.log(userData);
        res.render('home',{data, 'user':userData
    });})
    .catch((err)=>{
        console.log(err);
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

app.get('/department',(req,res) => {
    res.render('login');
})

app.post('/department',(req,res)=>{
    if(req.body['id'] == undefined){
        departmentModel.authenticate(req.body['department'],req.body['password'])
        .then(department => issueModel.list())
        // .then(contract => res.render(contract))
        // .then(data => data['data']['complain_details'])
        .then(data => {
            res.render('department', {data})})
        .catch(err => res.send("Error: "+err))
    }
    else{
        complaintModel.update(req.body['id'], req.body.status, req.body['department'])
        .then(department => issueModel.list())
        .then(contract => res.render(contract))
        // .then(data =>  data['data']['complain_details'])
        // .then(data => {
        //     department = req.body['department'];
        //     return res.render('department', {data, department});})
        .catch(err => res.send("Error "+err))
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
