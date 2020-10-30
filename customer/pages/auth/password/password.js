var vm = new Vue({
	el: '#app',
	data: {
		name: null,
		phone: null
	},
	methods: {
		change_password: function () {
			var mydata = {
				name: localStorage.getItem('name'),
				old: document.getElementById("old").value,
				new: document.getElementById("new").value,
				again: document.getElementById("again").value
			}
			fetch('http://localhost:3000/verify', {
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



