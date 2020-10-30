// 创建Vue 实例，用于JS与HTML之间的交互渲染
var vm = new Vue(
    {
        //绑定哪一个区域
        el:'#app',
        data:{
            usernameInput : null,
            phoneInput : null,
            smsInput : null,
            passwordInput : null,
            SmsButton:'获取验证码'
        },
        //该区域用到的函数
        methods:{
            login:function() {
              toPage('login')
            },
            //发送验证码时触发的函数
            sendSms : function()
            {
                //判断你的用户名有没有填写
                if(this.usernameInput === null || this.usernameInput === '')
                {
                    window.alert('手机号为空');
                    return;
                }
                var _this = this;
                var check=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                //当输入不是数字的时候，Number后返回的值是NaN，然后用isNaN判断
                if (!check.test(this.usernameInput)){
                    window.alert('请输入正确的手机号');
                    return;
                }
                //组装发送参数
                var params = {
                    mobilePhoneNumber : _this.usernameInput,
                    template : "通用模板"
                }
                //调用后端发送验证码
                if(this.SmsButton!="获取验证码"){
                    return;
                }
                /*
                Bmob.requestSmsCode(params).then(function (response) {
                  _this.SmsButton = 60
                  const interval = window.setInterval(() => {
                      if(_this.SmsButton-- <= 0){
                          _this.SmsButton='获取验证码'
                          window.clearInterval(interval)
                      }
                  },1000)
                  window.alert('短信验证码已发送');
                }).catch(function(error) {
                  window.alert('发送失败：'+ error.error);
                });
                */
            },
            // 注册
            reg: function(){
                //判断你的用户名有没有填写
                if(this.usernameInput === null || this.usernameInput === ''){
                    window.alert('用户名必须填写');
                    return;
                }
                //判断手机号不规范
                var check=/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
                if(!check.test(this.usernameInput)){
                    window.alert('请输入正确的手机号码');
                    return;
                }
                //判断你的密码有没有填写
                if(this.passwordInput === null || this.passwordInput === ''){
                    window.alert('密码必须填写');
                    return;
                }
                //判断密码是否小于六位
                if(parseInt(this.passwordInput.length)<6){
                    window.alert('请输入6位以上密码');
                    return;
                }
                window.alert('注册成功，将跳转至登录界面');
                toPage('login')
            }
        }
    }
)