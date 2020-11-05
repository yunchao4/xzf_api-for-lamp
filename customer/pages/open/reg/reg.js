// 创建Vue 实例，用于JS与HTML之间的交互渲染
var vm = new Vue({
    //绑定哪一个区域
    el: '#app',
    data: {
        usernameInput: null,
        phoneInput: null,
        passwordInput: null,
    },
    //该区域用到的函数
    methods: {
        login: function() {
            toPage('login')
        },
        //发送验证码时触发的函数
        sendSms: function() {
            /*
            //判断你的用户名有没有填写
            if (this.usernameInput === null || this.usernameInput === '') {
                window.alert('手机号为空');
                return;
            }
            var _this = this;
            var check = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            //当输入不是数字的时候，Number后返回的值是NaN，然后用isNaN判断
            if (!check.test(this.usernameInput)) {
                window.alert('请输入正确的手机号');
                return;
            }
            //组装发送参数
            var params = {
                mobilePhoneNumber: _this.usernameInput,
                template: "通用模板"
            }
            //调用后端发送验证码
            if (this.SmsButton != "获取验证码") {
                return;
            }
            */
        },
        // 注册
        reg: function() {
            //判断你的用户名有没有填写
            if (this.phoneInput === null || this.phoneInput === '') {
                window.alert('手机号必须填写');
                return;
            }
            //判断手机号不规范
            var check = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            if (!check.test(this.phoneInput)) {
                window.alert('请输入正确的手机号码');
                return;
            }
            //判断你的用户名有没有填写
            if (this.usernameInput === null || this.usernameInput === '') {
                window.alert('用户名必须填写');
                return;
            }
            //判断你的用户名是否过长
            if (parseInt(this.usernameInput.length) > 10) {
                window.alert('请输入不超过10位用户名');
                return;
            }
            //判断你的密码有没有填写
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
                    username: this.usernameInput,
                    password: this.passwordInput,
                    phone: this.phoneInput
                }
                //访问路由
                //TODO: 登录失败禁止跳转
            fetch('http://localhost:3000/register', {
                    method: 'post',
                    mode: 'cors',
                    body: JSON.stringify(mydata),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data == '1') {
                        window.alert('用户名已存在');
                        return;
                    } else if (data == '2') {
                        window.alert('手机号已存在');
                        return;
                    } else {
                        window.alert('注册成功');
                        toPageByFolder('open', 'login');
                    }
                })
                .catch(function(err) {
                    console.log("[error]: ", err);
                })
        }
    }
})