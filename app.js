var createError = require('http-errors');
var bodyParser = require('body-parser');//解析请求体的模块，必须加，新版的express实现了中间件分离，所以没有了请求体，所以后出现向后端发送信息错误
var express = require('express');
var path = require('path');
var fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var verify = require('./api/verify/verify');
var logger = require('morgan');
var change_password = require('./api/change_password/change_password')
var app = express();  //申请express类下的app对象
var homepage = require('./routes/index'); //引入设置主页的包
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./api/login/login');
var change_location = require('./api/change_location/change_location');

var save_photo = require('./api/save_photo/save_photo');
var save_order = require('./api/save_order/save_order');

//本项目需要引进的包
var tokenPackage = require('./api/token/token'); //引入关于自定义的token的包，里面有token的验证函数
var expressJwt = require('express-jwt'); //进入jwt模块，是用于验证是否过期的
const { json, response } = require('express');
const { connect } = require('http2');
var cors = require('cors'); //跨域访问
const { parse } = require('path');
const { http } = require('http');
const { param } = require('./routes/index');
//设置主页
app.use('/', homepage);
//中间件解决跨域问题，指定源端口白名单是为了安全，必须指定，如果不指定的话，你跨域交流就是出错
app.use(cors({ credentials: true, origin: 'http://172.18.52.55:3000' }));
// app.use(bodyParser()); 
// parse application/x-www-form-urlencoded  
//app.use(bodyParser.urlencoded({ extended: false }))

//如果不添加下两行代码，图片的BASE64数据会太大而无法添加
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// parse application/json  
app.use(bodyParser.json())
app.use('/login', login);
app.use('/verify', change_password);
app.use('/location', change_location);

app.use('/save_photo', save_photo);
app.use('/save_order', save_order);

// app.use('/verify',verify); //拦截的函数
//设置管理静态目录(cutomer为我们前端页面的根目录)
app.use(express.static(path.join(__dirname, 'customer')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(3000);
module.exports = app;
