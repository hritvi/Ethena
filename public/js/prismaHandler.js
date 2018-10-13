
//after the script tags are loaded (web3 & jquery) run this function
prismaHandler = (id) => {
    //initialize 
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:1234"));
    var contractInstance;
    //load the json file we wrote to earlier
    $.getJSON("../balanceContract.json", function(balanceContract) {
        //get the instance of our contract using the (1) address and (2) abi as discussed earlier
        //we will always need these 2 to interact with a deployed contract instance
        contractInstance = web3.eth
        .contract(JSON.parse(balanceContract.abi))
        .at(balanceContract.address);
        
        //on the vote button click, execute this function on the contract.
        //from: sign the transaction by using the first account
        // issueCount = contractInstance.getIssueCount.call();
        // issueCount = issueCount['c'][0];
        // console.log(issueCount);
        // issue = $("#issue").val();
        contractInstance.voteForCandidate(
            id,
            { from: web3.eth.accounts[0] },
            function() {
                console.log("added token for "+ id);
                console.log("Token of this user is " + contractInstance.getPrisma.call(id));
                // let div_id = "token-" + id;
                // $("#" + div_id).html(contractInstance.getPrisma.call(id).toString());
            });
            
        // window.addIssue = function(issue) {
        //     contractInstance.addUser(issue,
        //         { from: web3.eth.accounts[0] }, function() {
        //             window.console.log("Issue added");
        //         });
        //     }
            
        //after we have an instance of the contract update the initial candidate votes
        //recall that during deploying the contract we updated votes for Rama to 1
        // for (var i = 0; i < issueCount; i++) {
        //     let val = contractInstance.getPrisma.call(i).toString();
        //     console.log("val "+val);
        //     $("#votes-" + i).html(val);
        // }
    });
};
        
        
        