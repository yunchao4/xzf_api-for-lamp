var express = require('express');
var router = express.Router();
var tokenPackage = require('../token/token');
var verify = function (req, res, next) {
	//利用请求头得到携带的token信息
	var token = req.headers['authorization'];
	// var token = 12345;//检验判断token错误
	if (token == 'null') {
		console.log('token未定义');
		next();
	}
	//token不为空才验证
	else {
		//调用token的验证函数，如果验证成功，则用data获取数据
		tokenPackage.getToken(token).then((data) => {
			console.log('token验证成功');
			next();
		}).catch((error) => {
			console.log('ERROR', error);
			console.log('执行错误');
			next();
		})
	}
}
module.exports = verify;