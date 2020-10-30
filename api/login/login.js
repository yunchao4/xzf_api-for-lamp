var express = require('express');
var router = express.Router();
var tokenPackage = require('../token/token');
var myconnection = require('../connect/connect');
var mysql = require('mysql'); //引入mysql模块的mysql对象



router.use('/', function (req, res, next) {
	let { password, name } = req.body;
	var token = tokenPackage.setToken(req.body.name, req.body.password);
	res.json(token);
	//修改的功能函数部分
	// var sql = 'SELECT * FROM user'; //输user表的所有数据
	// var str = '';
	// //调用query方法执行查询mysql数据库
	// myconnection.connection.query(sql, function (err, result) {
	//   if (err) {
	//     console.log('[error]:', err.message);
	//   }
	//   str = JSON.stringify(result);
	//   console.log(result);
	// });
});
module.exports = router;