var vm = new Vue({
	el: '#app',
	data: {
		name: null,
		phone: null
	},
	methods: {
		change_location: function () {
			var mydata = {
				location: document.getElementById('location').value,
				name: localStorage.getItem('name')
			}
			console.log(mydata);
			fetch('http://localhost:3000/location', {
				method: 'post',
				mode: 'cors',
				headers: {
					'Authorization': localStorage.getItem('token'),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(mydata)
			}).then(
				function (response) {
					return response.json();
				}).then(function (data) {
					console.log(data);
				})
		}
	}
})
