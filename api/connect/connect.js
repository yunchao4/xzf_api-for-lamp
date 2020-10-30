var mysql = require('mysql'); //引入mysql模块的mysql对象

//申请一个数据库对象
/*修改部分，配置数据库,即是调用crateConnection方法创建一个connection对象，
该对象就是配置信息所指定的数据库接口可以根据自己的自行修改*/
var pool = mysql.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'root',
	database: 'sys'
});
module.exports = {
	pool
}
