
//after the script tags are loaded (web3 & jquery) run this function
window.onload = function() {
    //initialize 
    console.log('Bhartiya was here')
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
        window.voteForCandidate = function(id) {
            // issue = $("#issue").val();
            id = Number(id.substring(7));
            contractInstance.voteForCandidate(
                id,
                { from: web3.eth.accounts[0] },
                function() {
                    console.log("voted for id "+ id);
                    let div_id = "voted-" + id;
                    $("#" + div_id).html(contractInstance.totalVotesFor.call(id).toString());
                });
            };
            
        window.addIssue = function(issue) {
            contractInstance.addUser(issue,
                { from: web3.eth.accounts[0] }, function() {
                    window.console.log("Issue added");
                });
            }
            
            //after we have an instance of the contract update the initial candidate votes
            //recall that during deploying the contract we updated votes for Rama to 1
            for (var i = 0; i < issuesList.length; i++) {
                let issue = issuesList[i];
                let val = contractInstance.totalVotesFor.call(issue).toString();
                $("#" + issuesList[issue]).html(val);
            }
        });
        
        var issuesList = {
            Rama: "issue-1",
            Nick: "issue-2",
            Claudius: "issue-3",
            Harsh: "issue-4"
        };
        
        $()
        
        var issues = Object.keys(issuesList);
        
    //initialize candidate votes to 0 until we have an instance of the contract instance
    $(document).ready(function(event) {
        for (var i = 0; i < issues.length; i++) {
            let name = issues[i];
            $("#" + issuesList[name]).html(0);
        }
    });
};
        
        
        