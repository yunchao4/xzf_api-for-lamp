var pool = require('../connect/connect');   //引入连接池，里面包含了需要连接的数据库的信息
var express = require('express');
var verify = require('../verify/verify')  //引入token验证包
var router = express.Router();
router.use('/', verify);
router.use('/', function (req, res, next) {
	var location = req.body.location;
	var name = req.body.name;
	// var sql = "SELECT address FROM user where name=" + "'" + name + "'"; //输user表的所有数据
	var sql = "update user set location = " + "'" + location + "'" + ' where username = ' + "'" + name + "'";
	//调用query方法执行查询mysql数据库对应账号的密码,用连接池是为了建立一次连接使用多次数据库，建立连接很耗时间
	pool.pool.getConnection(function (err, connection) {
		if (err) {
			console.log('连接池错误', err.message);
			return err.message;
		}
		connection.query(sql, function (err, result) {
			if (err) {
				res.json({status:"0"});
				console.log('[error]:', err.message);
				next();
			}
			else {
				res.json({status:"1"});
				console.log('修改成功');
			}
		});
	})  //pool
})  //router


module.exports = router;