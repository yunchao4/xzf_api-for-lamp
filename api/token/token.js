const { JsonWebTokenError } = require("jsonwebtoken");

var jwt = require('jsonwebtoken');  //申请jwt对象，为了使用它的函数
var jwtsecret = 'group4';   //密钥
//生成token函数
var setToken = function (name, password) {
    //实际上promise的两个参数的意思就是成功或者失败的时候的反应方便写两种情况的处理
    //'Bearer '必加注意后面有空格
    const token =jwt.sign({ name: name, password: password }, jwtsecret, { expiresIn: '24h' });
    return token;
}
//各个接口验证token的函数
var getToken = function (token) {

    return new Promise((resolve, reject) => {
        var info = jwt.verify(token,jwtsecret);
        resolve(info),(reject)=>{
            console.log("验证失败");
        }
        
    })
}
//其他js页可以使用本页的函数
module.exports = {
    setToken,
    getToken
}