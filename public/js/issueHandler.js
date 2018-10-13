
//after the script tags are loaded (web3 & jquery) run this function
window.onload = function() {
    //initialize 
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var contractInstance;
    //load the json file we wrote to earlier
    
    $.getJSON("../contract.json", function(contract) {
        //get the instance of our contract using the (1) address and (2) abi as discussed earlier
        //we will always need these 2 to interact with a deployed contract instance
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        
        //on the vote button click, execute this function on the contract.
        //from: sign the transaction by using the first account
        issueCount = contractInstance.getIssueCount.call();
        issueCount = issueCount['c'][0];
        window.voteForCandidate = function(id) {
            id = Number(id.substring(7));
            contractInstance.voteForCandidate(
                id,
                { from: web3.eth.accounts[0] },
                function() {
                    let div_id = "votes-" + id;
                    $("#" + div_id).html(contractInstance.totalVotesFor.call(id).toString());
                    if(contractInstance.totalVotesFor.call(id)==3){
                        prismaHandler(Number(contractInstance.getUserId.call(id)));
                    }
                    $('#upvote-'+id).removeAttr("onclick")
                });
            };
            
        //after we have an instance of the contract update the initial candidate votes
        //recall that during deploying the contract we updated votes for Rama to 1
        for (var i = 0; i < issueCount; i++) {
            let val = contractInstance.totalVotesFor.call(i).toString();
            $("#votes-" + i).html(val);
        }
    });
};
        
        
        