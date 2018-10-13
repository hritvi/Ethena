var solc = require("solc"); 
var Web3 = require("web3"); 
var fs = require("fs"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
var contract = require('../public/contract')
function issueModel(){
}

issueModel.insert = function(body, urgency) {
}

issueModel.list = () => {
    return new Promise((resolve, reject) =>
    {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        issueCount = contractInstance.getIssueCount.call();
        issueCount = issueCount['c'][0];
        issuesList = []
        for(i=0;i<issueCount;i++){
            issuesList[i] = {'issue': contractInstance.getIssue.call(i)};
        }
        resolve(issuesList);
    })
}

issueModel.update = (id, status, department) => {
}

module.exports = issueModel;