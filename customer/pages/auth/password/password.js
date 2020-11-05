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
			var self = this;
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
					if (JSON.parse(data.status) == 1) {
						alert("修改成功，1秒后跳转");
						setTimeout(self.changeState(), 1000)
					}
					else{
						alert(data.msg);
					}
				})
		},
		changeState:function() {
			window.location.href = "/pages/auth/my/my.html"
		}
	}
})



