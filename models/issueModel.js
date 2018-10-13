var Web3 = require("web3"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); 
var contract = require('../public/contract')
var userModel = require('./userModel')
function issueModel(){
}

issueModel.addIssue = async function(body, userid, addressedUser) {
    contractInstance = web3.eth
    .contract(JSON.parse(contract.abi))
    .at(contract.address);
    var addressedUserId;
    await userModel.getId(addressedUser)
    .then((data) => {
        addressedUserId = data;
    })
    var user;
    await userModel.getUsername(Number(userId))
    .then((userFed) => {
        user = userFed;
    })
    console.log("Issue About to be added")
    contractInstance.addIssue(body, userid, addressedUserId, {
        from: web3.eth.accounts[0] })
    console.log("Issue added")
    issueCount = contractInstance.getIssueCount.call();
    issueCount = issueCount['c'][0];
    issuesList = []
    for(i=0;i<issueCount;i++){
        userId = contractInstance.getUserId.call(i)
        addressedUserId = contractInstance.getAddressedUserId.call(i)
        await userModel.getUsername(Number(userId))
        .then((userFed) => {
            user = userFed;
        })
        await userModel.getUsername(Number(addressedUserId))
        .then((data) => {addressedUser = data})
        issuesList[i] = {'issue': contractInstance.getIssue.call(i), 'addressedUser':addressedUser, 'user':user};
    }
    return issuesList;
}
    
    issueModel.list = async function listingData() {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        issueCount = contractInstance.getIssueCount.call();
        issueCount = issueCount['c'][0];
        issuesList = []
        for(i=0;i<issueCount;i++){
            userId = contractInstance.getUserId.call(i)
            addressedUserId = contractInstance.getAddressedUserId.call(i)
            var user;
            await userModel.getUsername(Number(userId))
            .then((userFed) => {
                user = userFed;
            })
            var addressedUser;
            await userModel.getUsername(Number(addressedUserId))
            .then((data) => {addressedUser = data})
            issuesList[i] = {'issue': contractInstance.getIssue.call(i), 'addressedUser':addressedUser, 'user':user};
        }
        return issuesList;
    }
    
    issueModel.update = (id, status, department) => {
    }
    
    module.exports = issueModel;