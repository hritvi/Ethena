var havenondemand = require('havenondemand')
var client = new havenondemand.HODClient('700b53e2-40d1-43b8-9e5a-3f06d91458cf', 'v1')
let Model = require('../models/complaintModel')

function sentimentController() {

}

sentimentController.findUrgency = (req, res) => {
    var inputText = req.body['c-body'];
    
    var data = {'text' : inputText}
    client.get('analyzesentiment', data, false, function(err, resp, body) {
        if (!err) {
            var score = resp.body['aggregate']['score'];
            var label
            
            if (score <= -0.75)
            label = 'high';
            else if (score > -0.75 && score <= -0.5)
            label = 'moderate';
            else if (score > -0.5 && score <= 0)
            label = 'low';
            else
            label = 'Not of interest right now';
            Model.insert(req.body, label)
            .then((complain_id) => {
                res.send("Your Complaint has been succesfully registered and your complain id is " + complain_id);
            })
            .catch((err) => {
                res.send("Error: "+ err);
            })
        }
    })
}

module.exports = sentimentController;