var solc = require("solc"); 
var Web3 = require("web3"); 
var fs = require("fs"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:1234")); 
var contract = require('../public/balanceContract')
function prismaModel(){
}

prismaModel.insert = function(body, urgency) {
}

prismaModel.list = () => {
}

prismaModel.update = (id, status, department) => {
}

prismaModel.listPrismas = () => {
	return new Promise((resolve, reject) =>
    {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        prismaCount = contractInstance.getPrismaCount.call();
        prismaList = []
        for(i=0;i<=prismaCount;i++){
            username = contractInstance.getUser.call(i);
            console.log(username);
            prisma = Number(contractInstance.getPrisma.call(i));
            if(username != undefined)
                prismaList.push({prisma , username});
        }
        prismaList.sort((a,b) => (a.prisma > b.prisma) ? -1 : ((b.prisma > a.prisma) ? -1 : 0)); 
        resolve(prismaList);
    })
}

module.exports = prismaModel;