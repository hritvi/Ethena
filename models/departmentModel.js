var fetch = require('node-fetch');
function departmentModule() {
    
}

departmentModule.authenticate = (department, password) => {
    return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'{department(where: {_and: [{Department: { _eq : "'+department + '"}},{password: {_eq: "'+ password + '"}}]}) {id}}'})
    })
    .then(r => r.json())
    .then(data => {
        if(data['data']['department'][0] != undefined){
            resolve(department);
        }
        else{
            reject("Wrong Password");
        }
    });
});
}


module.exports = departmentModule;