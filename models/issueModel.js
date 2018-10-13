var Web3 = require("web3"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
var contract = require('../public/contract')
function issueModel(){
}

issueModel.addIssue = function(body, userid) {
    return new Promise((resolve, reject) => {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        console.log("Issue about to be added " + body+ userid)
        contractInstance.addIssue(body, userid, {
            from: web3.eth.accounts[0] })
        console.log("Issue Added succesfully")
        issueCount = contractInstance.getIssueCount.call();
        issueCount = issueCount['c'][0];
        issuesList = []
        for(i=0;i<issueCount;i++){
            issuesList[i] = {'issue': contractInstance.getIssue.call(i)};
        }
        console.log("Issue Added succesfully and retrieved")
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