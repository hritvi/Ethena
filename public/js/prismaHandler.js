
//after the script tags are loaded (web3 & jquery) run this function
prismaHandler = (id, type, userId) => {
    //initialize 
    var label = {'same': 10,'different': 20}
    console.log(type)
    var scoreCount = label[type]
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:1234"));
    var contractInstance;
    //load the json file we wrote to earlier
    $.getJSON("../balanceContract.json", function(balanceContract) {
        //get the instance of our contract using the (1) address and (2) abi as discussed earlier
        //we will always need these 2 to interact with a deployed contract instance
        contractInstance = web3.eth
        .contract(JSON.parse(balanceContract.abi))
        .at(balanceContract.address);

        contractInstance.voteForCandidate(
            id, scoreCount,
            { from: web3.eth.accounts[0] },
            function() {
                if(String(id) == String(userId)){
                    prismaCount = contractInstance.getPrisma.call(id)
                    $('#prismaCount').html(prismaCount.toString())
                    $('[name="prisma"]').val(prismaCount)
                }
            });
    });
};
