var vm = new Vue({
	el: '#app',
	data: {
		name: null,
		phone: null
	},
	methods: {
		login: function () {
			toPageByFolder("open", "login");
			/*var mydata = {
				password: 123456,
				username: 'sc'
			}
			//模拟一件登陆
			fetch('http://localhost:3000/login', {
				method: 'post',
				mode: 'cors',
				body: JSON.stringify(mydata),
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}).then(
				function (response) {
					return response.json();
				}).then(function (data) {
					localStorage.setItem("token", data);
					localStorage.setItem("name", mydata.username);
				})*/
		},
		jump_password: function () {
			if (localStorage.getItem('name') != null)
				toPage("password");
		},
		jump_location: function () {
			if (localStorage.getItem('name') != null)
				toPage("location");
		},
		quit: function () {
			localStorage.clear();
			// location.href="登陆页面"
		}
	}
})

 