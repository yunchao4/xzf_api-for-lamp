var pool = require('../connect/connect');   //引入连接池，里面包含了需要连接的数据库的信息
var express = require('express');
var verify = require('../verify/verify');  //引入token验证包
const { response } = require('express');
var router = express.Router();
router.use('/', verify);
router.use('/', function (req, res, next) {
	var token = req.headers['authorization'];
	var name = req.body.name;
	var old = req.body.old;
	var newp = req.body.new;
	var again = req.body.again;
	var sql = "SELECT password FROM user where username=" + "'" + name + "'"; //输user表的所有数据
	var str = '';//就是为了取出原密码
	//调用query方法执行查询mysql数据库对应账号的密码,用连接池是为了建立一次连接使用多次数据库，建立连接很耗时间
	if (token.length != 4) {
		pool.pool.getConnection(function (err, connection) {
			if (err) {
				console.log('连接池错误', err.message);
				return err.message;
			}
			connection.query(sql, function (err, result) {
				if (err) {
					res.json({ status: "0" });
					console.log('[error]:', err.message);
				}
				else {
					str = result[0].password;
					if (old == str && (old != null) && (old.length != 4)) {
						if (newp == again && (newp != null)) {
							var sql = "update user set password = " + "'" + newp + "'" + ' where username = ' + "'" + name + "'";
							console.log('要执行的sql语句：', sql);
							connection.query(sql, [{ password: newp, name }], function (err, result) {
								if (err) {
									console.log('[error]', err.message);
								}
								else {
									res.json({
										status: "1",
										msg: "修改成功"
									});
									console.log('修改成功');
								}
							})
						}
						else {
							res.json({
								status: "2",
								msg: "新密码或者再次输入不一致，请重新输入"
							});
							console.log('新密码或者再次输入不一致，请重新输入');
						}
					}
					else {
						res.json({
							status: "3",
							msg: "原密码不正确，请重新输入"
						});
						console.log('原密码不正确，请重新输入')
					}
				}
			});
			// connection.release();//释放连接池
			pool.pool.releaseConnection(connection);//释放连接池
		});
	}
})

module.exports = router;