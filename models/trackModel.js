function trackModel(){
}
var fetch = require('node-fetch');

trackModel.getTrack = function(id) {
	return new Promise((resolve, reject) => {
		fetch('https://hasuraa.herokuapp.com/v1alpha1/graphql', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		    'Accept': 'application/json',
		  },
		  body: JSON.stringify({query:'{complain_details(where: {id: { _eq : "' + id + '"}}) {complaint_status}}'})
		})
		  .then(r => r.json())
		  .then(data => {
		  				return data['data']['complain_details'][0]['complaint_status'];
							})
		  .then(status => resolve(status))
		  .catch(err => resolve(err));
	});
}

module.exports = trackModel;