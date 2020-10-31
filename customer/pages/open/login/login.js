// 创建Vue 实例，用于JS与HTML之间的交互渲染
var vm = new Vue(
    {
        //绑定哪一个区域
        el: '#app',
        data: {
            usernameInput: null,
            passwordInput: null,
        },
        //该区域用到的函数
        methods: {
            reg: function () {
                toPage('reg')
            },
            login: function () {
                if (this.usernameInput === null || this.usernameInput === '') {
                    window.alert('用户名必须填写');
                    return;
                }
                var check = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                /*if (!check.test(this.usernameInput)) {
                    window.alert('请输入正确用户名');
                    return;
                }*/
                if (this.passwordInput === null || this.passwordInput === '') {
                    window.alert('密码必须填写');
                    return;
                }
                //判断密码是否小于六位
                if (parseInt(this.passwordInput.length) < 6) {
                    window.alert('请输入6位以上密码');
                    return;
                }
                //登录信息结构体
                var mydata = {
                    password: this.passwordInput,
                    username: this.usernameInput
                }
                //访问路由
                //TODO: 登录失败禁止跳转
                fetch('http://172.18.52.55:3000/login', {
                    method: 'post',
                    mode: 'cors',
                    body: JSON.stringify(mydata),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        localStorage.setItem("token", data);
                        localStorage.setItem("name", mydata.username);
                        toPageByFolder('auth', 'photo');
                    })
                    .catch(function (err) {
                        console.log("[error]: ", err);
                    })
            }
        }
    }
)