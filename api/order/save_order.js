var pool = require('../connect/connect');
var express = require('express');
var verify = require('../verify/verify');
var router = express.Router();
router.use('/', verify);
router.use('/', function (req, res, next) {
    var imgID = req.body.imgID;
    var orderID = req.body.orderID;
    var storeID = req.body.storeID;
    var type = req.body.type;
    var userID = req.body.userID;
    var number = req.body.number;
    var money = req.body.money;
    var location = req.body.location;
    var myDate = new Date()
    //数据表名为order时出错
    var findTable = "SELECT * from orders";
    var sql = "INSERT INTO orders (orderID, userID, storeID, imgID, type, number, money, location,create_at) VALUES(?,?,?,?,?,?,?,?,?)"
    var sqlParams = [orderID, userID, storeID, imgID, type, number, money, location,myDate];
    pool.pool.getConnection(function (err, connection) {
        if (err) {
            console.log('连接池错误', err.message);
            return err.message;
        }
        connection.query(findTable, function (err, result) {
            if (err) {
                console.log('[error]:', err.message);
                next();
            }
            else {
                connection.query(sql, sqlParams, function (err, result) {
                    if (err) {
                        console.log('[插入错误] - ', err.message);
                        return;
                    }
                    //console.log("INSERTED: ", result);
                })
            }
        });
        // connection.release();//释放连接池
        pool.pool.releaseConnection(connection);//释放连接池
    });

})

module.exports = router;
