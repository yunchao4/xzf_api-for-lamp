var express = require('express');
var router = express.Router();
var tokenPackage = require('../token/token');
var pool = require('../connect/connect'); //引入连接池，里面包含了需要连接的数据库的信息

router.use('/', function(req, res, next) {
    var name = req.body.username;
    var password = req.body.password;
    var sql = "SELECT password FROM user where username=" + "'" + name + "'"; //输user表的所有数据
    var str = ''; //就是为了取出原密码
    //调用query方法执行查询mysql数据库对应账号的密码,用连接池是为了建立一次连接使用多次数据库，建立连接很耗时间
    pool.pool.getConnection(function(err, connection) {
        if (err) {
            console.log('连接池错误', err.message);
            return err.message;
        }
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[error]:', err.message);
                next();
            } else {
                if (result.length != 0) {
                    //console.log("result", result);
                    str = result[0].password;
                    if (password == str && (password != null)) {
                        console.log('login success!');
                        var  token  =  tokenPackage.setToken(req.body.name,  req.body.password);  //生成token用于后续验证                  
                        res.json(token);
                    } else {
                        console.log('password is not correct!');
                        res.json('2');
                    }
                } else {
                    console.log('username is not exist!');
                    res.json('1');
                }
            }
        });
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
        // connection.release();//释放连接池
        pool.pool.releaseConnection(connection); //释放连接池
    });
});
module.exports = router;