var pool = require('../connect/connect');
var express = require('express');
var verify = require('../verify/verify');
var router = express.Router();
router.use('/', verify);
router.use('/', function (req, res, next) {
    var imgID = req.body.imgID;
    var image = req.body.image;
    //console.log(image)
    var cate = req.body.category;
    var size = req.body.size;
    var bgc = req.body.bgc;
    /*var sql = "INSERT INTO photo (imgID, image, category, size, bgc) VALUES("
        + "'" + imgID + "'"
        + "'" + image + "'"
        + "'" + cate + "'"
        + "'" + size + "'"
        + "'" + bgc + "'"
        + ")"; */
    var findTable = "SELECT * from photo";
    var sql = "INSERT INTO photo (imgID, image, category, size, bgc) VALUES(?,?,?,?,?)"
    var sqlParams = [imgID, image, cate, size, bgc];
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
