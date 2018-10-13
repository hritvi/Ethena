function complaintModel(){
}
var fetch = require('node-fetch');

complaintModel.insert = function(body, urgency) {
    return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: 'mutation {insert_complain_details(objects: [{complaint:"'+ body['c-body']+ '",plaintiff:"'+ body['p-name'] +'",plaintiff_locality:"'+body['p-locality']+'",plaintiff_pincode:'+body['p-pincode'] +',plaintiff_city:"'+body['p-city'] +'",plaintiff_state:"'+body['p-state'] +'",complaint_department:"'+body['department'] +'",complaint_status:"'+['pending'] +'",urgency:"'+ urgency +'"} ]) {returning{id}}}'})
    })
    .then(r => {
        return r.json()})
        .then(data => {
            return data["data"]["insert_complain_details"]["returning"][0]["id"];})
            .then(complain_id => resolve(complain_id))
            .catch(err => resolve(err));
            
        });
    }
    
    complaintModel.list = (department) => {
        return new Promise((resolve, reject) => {
            fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query:'{complain_details(where: {complaint_department: { _eq : "'+ department +'"}}) {id,complaint,plaintiff_pincode,plaintiff_city,complaint_status,urgency}}'})
        })
        .then(r => r.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => reject(err));
    });
}

complaintModel.update = (id, status, department) => {
    return new Promise((resolve, reject) => {
        fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query:'mutation {update_complain_details(where: {id: {_eq:'+ id +'}},_set: {complaint_status: "'+status+'"}) {affected_rows}}'})
    })
    .then(r => resolve(department))
    .catch(err => reject(err))
})
}

module.exports = complaintModel;