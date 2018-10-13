var solc = require("solc"); 
var Web3 = require("web3"); 
var fs = require("fs"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:1234")); 
var contract = require('../public/balanceContract')
function prismaModel(){
}

prismaModel.insert = function(body, urgency) {
}

prismaModel.list = () => {
}

prismaModel.update = (id, status, department) => {
}

module.exports = prismaModel;