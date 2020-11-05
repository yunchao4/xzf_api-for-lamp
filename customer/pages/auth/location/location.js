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
			var self = this;
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
					if (JSON.parse(data.status) == 1) {
						alert("修改成功，1秒后跳转");
						setTimeout(self.changeState(), 1000)
					}
				})
		},
		changeState:function() {
			window.location.href = "/pages/auth/my/my.html"
		}
	}
})
