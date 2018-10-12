var fetch = require('node-fetch');
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
            resolve(username);
            console.log(username);
        }
        else{
            reject("Wrong Password");
            console.log("Wrong Password");
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
        body: JSON.stringify({query: 'mutation {insert_user(objects: [{name:"'+ body['name']+ '",password:"'+ body['password'] +'",email:"'+body['email']+'",username:"'+body['username'] +'" ,phone:"'+body['phone'] +'"} ]) {returning{id}}}'})
    })
    .then(r => {
        return r.json()})
        .then(data => {
            resolve(data);
            console.log(data);
            
        });
    });
}

module.exports = userModel;
	