var fetch = require('node-fetch');
var Web3 = require("web3"); 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:1234")); 
var contract = require('../public/balanceContract')

function userModel() {

}

userModel.authenticate = (username, password) => {
	return new Promise((resolve, reject) => {
		fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{user(where: {_and: [{username: { _eq : "'+username + '"}},{password: {_eq: "'+ password + '"}}]}) {id}}'})
    })
    .then(r => r.json())
    .then(data => {
        if(data['data']['user'][0]['id'] != undefined){
            var user = {'id': data['data']['user'][0]['id'], 'name': username}
            resolve(user);
        }
        else{
            reject("Wrong Password");
        }
    });
	});
}

userModel.insert = (body, res) => {
	return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: 'mutation {insert_user(objects: [{name:"'+ body['name']+ '",password:"'+ body['password'] +'",email:"'+body['email'] +'",username:"'+body['name'] +'"} ]) {returning{id}}}'})
    })
    .then(r => {
        return r.json()})
    .then(data => {
            resolve(data);
        });
    });
}

userModel.getPrisma = (id) => {
    return new Promise((resolve, reject) => {
        contractInstance = web3.eth
        .contract(JSON.parse(contract.abi))
        .at(contract.address);
        resolve(contractInstance.getPrisma.call(id));
    })
}

userModel.getId = (username) => {
    return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{user(where: {_and: [{username: { _eq : "'+username + '"}}]}) {id}}'})
    })
    .then(r => r.json())
    .then(data => {
        console.log(data['data']['user'][0]['id']);
        resolve (data['data']['user'][0]['id']);
    })
  })
}

userModel.getUsername = (id) => {
    return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{user(where: {_and: [{id: { _eq : "'+ id + '"}}]}) {username}}'})
        })
        .then(r => r.json())
        .then(data => {
            if(data['data']['user'] == undefined){
                console.log("Database doesnot have this id: "+id);
                reject("Database doesnot have this id: "+id);
            }
            console.log(data['data']['user'][0]['username']);
            resolve (data['data']['user'][0]['username']);
        })
    })
}

module.exports = userModel;
	