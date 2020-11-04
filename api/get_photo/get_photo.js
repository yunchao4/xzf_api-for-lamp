var pool = require('../connect/connect');   //引入连接池，里面包含了需要连接的数据库的信息
var express = require('express');
var verify = require('../verify/verify')  //引入token验证包
var router = express.Router();
router.use('/', verify);
router.use('/', function (req, res, next) {
    // console.log("req.length:"+req.body.length);
    
    	//调用query方法执行查询mysql数据库对应账号的密码,用连接池是为了建立一次连接使用多次数据库，建立连接很耗时间
	pool.pool.getConnection(function (err, connection) {
		if (err) {
			console.log('连接池错误', err.message);
			return err.message;
		}
		
			 var sql = "SELECT * FROM photo"; //获取订单表的数据
			connection.query(sql, function (err, result) {
				if (err) {
					console.log('[SELECT error]:', err.message);
					next();
				}
				else {
					//得到数据，返回给前端
					// console.log(result);        //这里已经取到数据
					res.json(result);
				}
			});
		// }
		

        pool.pool.releaseConnection(connection);//释放连接池
	})  //pool
})  //router

module.exports = router;