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
    
    issueModel.listVotesAndRank = (username) => {
        return new Promise((resolve, reject) =>
        {
            contractInstance = web3.eth
            .contract(JSON.parse(contract.abi))
            .at(contract.address);
            issueCount = Number(contractInstance.getIssueCount.call());
            issuesList = []
            userVotes = {}
            for(i=0; i<issueCount; i++){
                issuesList[i] = {'username': String(contractInstance.getUser.call(i)), 'votes': contractInstance.totalVotesFor.call(i) }
                userVotes[issuesList[i].username] = userVotes[issuesList[i].username] == undefined? 1: userVotes[issuesList[i].username]+1;
                console.log("user and his votes " , issuesList[i].username,  userVotes[issuesList[i].username])
            }
            issuesList.sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)); 
            rank = issueCount;
            for(i=0;i<issueCount;i++){
                if(String(issuesList[i].username) == String(username)){
                    rank = i+1;
                    break;
                }
            }
            sortable = []
            for(var key in userVotes){
                sortable.push({'username':key, 'posts':userVotes[key]})
            }
            sortable.sort((a,b) => (a.posts > b.posts) ? -1 : ((b.posts > a.posts) ? 1 : 0));
            rank2 = issueCount;
            for(i=0;i<issueCount;i++){
                if(String(issuesList[i].username) == String(username)){
                    rank2 = i+1;
                    break;
                }
            }
            console.log("the issue list being passed " + issuesList + " its first element "+ issuesList[0])
            resolve({'data':issuesList, rank, rank2, 'data2': sortable});
        })
    }
    
    issueModel.listVotes = () => {
        return new Promise((resolve, reject) =>
        {
            contractInstance = web3.eth
            .contract(JSON.parse(contract.abi))
            .at(contract.address);
            issueCount = Number(contractInstance.getIssueCount.call());
            issuesList = []
            userVotes = {}
            for(i=0; i<issueCount; i++){
                issuesList[i] = {'username': String(contractInstance.getUser.call(i)), 'votes': contractInstance.totalVotesFor.call(i) }
                userVotes[issuesList[i].username] = userVotes[issuesList[i].username] == undefined? 1: userVotes[issuesList[i].username]+1;
                console.log("user and his votes " , issuesList[i].username,  userVotes[issuesList[i].username])
            }
            issuesList.sort((a,b) => (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)); 
            sortable = []
            for(var key in userVotes){
                sortable.push({'username':key, 'posts':userVotes[key]})
            }
            sortable.sort((a,b) => (a.posts > b.posts) ? -1 : ((b.posts > a.posts) ? 1 : 0));
            resolve([issuesList, sortable]);
        })
    }
    
    issueModel.update = (id, status, department) => {
    }
    
    module.exports = issueModel;