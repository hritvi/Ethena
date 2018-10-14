var Web3 = require("web3"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
var contract = require('../public/contract')
var userModel = require('./userModel')
function issueModel(){
}

issueModel.addIssue = async function(body, userid, addressedUser, user) {
    contractInstance = web3.eth
    .contract(JSON.parse(contract.abi))
    .at(contract.address);
    var addressedUserId;
    await userModel.getId(addressedUser)
    .then((data) => {
        addressedUserId = data;
    })
    console.log("Issue About to be added")
    contractInstance.addIssue(body, userid, addressedUserId, {
        from: web3.eth.accounts[0] })
    contractInstance.addUsers(user, addressedUser, {
        from: web3.eth.accounts[0] 
    })
    console.log("Issue added")
    issueCount = Number(contractInstance.getIssueCount.call());
    issuesList = []
    for(i=0;i<issueCount;i++){
        userId = contractInstance.getUserId.call(i)
        addressedUserId = contractInstance.getAddressedUserId.call(i)
        user = contractInstance.getUser.call(i)
        addressedUser = contractInstance.getAddressedUser.call(i)
        issuesList[i] = {'issue': contractInstance.getIssue.call(i), 'addressedUser':addressedUser, 'user':user};
    }
    return issuesList;
}
    
    issueModel.list = async function listingData() {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        issueCount = Number(contractInstance.getIssueCount.call());
        issuesList = []
        for(i=0;i<issueCount;i++){
            userId = contractInstance.getUserId.call(i)
            addressedUserId = contractInstance.getAddressedUserId.call(i)
            user = contractInstance.getUser.call(i)
            addressedUser = contractInstance.getAddressedUser.call(i)
            issuesList[i] = {'issue': contractInstance.getIssue.call(i), 'addressedUser':addressedUser, 'user':user};
        }
        return issuesList;
}

issueModel.listVotes = () => {
    return new Promise((resolve, reject) =>
    {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        issueCount = Number(contractInstance.getIssueCount.call());
        issuesList = []
        for(i=0; i<issueCount; i++){
            issuesList[i] = {'username': String(contractInstance.getUser.call(i)), 'votes': contractInstance.totalVotesFor.call(i) }
        }
        issuesList.sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? -1 : 0)); 
        resolve(issuesList);
    })
}

issueModel.update = (id, status, department) => {
}

module.exports = issueModel;