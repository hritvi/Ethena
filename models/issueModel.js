var Web3 = require("web3"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
var contract = require('../public/contract')
var userModel = require('./userModel')
function issueModel(){
}

issueModel.addIssue = function(body, userid, addressedUser) {
    return new Promise((resolve, reject) => {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        console.log(body+ " " + userid+ " "+ addressedUser);
        addressedUserId = Number(userModel.getId(addressedUser))
        userid = Number(userid)
        user = String(userModel.getUsername(userid))
        console.log("Issue About to be added")
        contractInstance.addIssue(body, userid, addressedUserId, {
            from: web3.eth.accounts[0] })
        console.log("Issue added")
        issueCount = contractInstance.getIssueCount.call();
        issueCount = issueCount['c'][0];
        issuesList = []
        for(i=0;i<issueCount;i++){
            issuesList[i] = {'issue': contractInstance.getIssue.call(i), 'addressedUser':addressedUser, 'user':user};
        }
        resolve(issuesList);
    })
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