const express = require('express')
const app = express()
const port = 3001
let sentimentController = require('./controller/sentimentController.js')
// let departmentController = require('./controller/departmentController.js')
let departmentModel = require('./models/departmentModel.js')
let complaintModel = require('./models/complaintModel.js')
let trackModel = require('./models/trackModel.js')
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

app.get('/department',(req,res) => {
    res.render('login');
})

app.post('/department',(req,res)=>{
    if(req.body['id'] == undefined){
    departmentModel.authenticate(req.body['department'],req.body['password'])
    .then(department => complaintModel.list(department))
    .then(data => data['data']['complain_details'])
    .then(data => {
        department = req.body['department'];
        res.render('department', {data, department})})
    .catch(err => res.send("Error: "+err))
    }
    else{
        complaintModel.update(req.body['id'], req.body.status, req.body['department'])
        .then(department => complaintModel.list(department))
        .then(data =>  data['data']['complain_details'])
        .then(data => {
            department = req.body['department'];
            return res.render('department', {data, department});})
        .catch(err => res.send("Error "+err))
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
