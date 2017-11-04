var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
 
 global.dbHandle = require('./common/dbHandle');
 global.db = mongoose.connect('mongodb://127.0.0.1:27017/webSite');//连接数据库

app.use(session({
	secret: 'secret',
	rolling: true,
	cookie: {
		maxAge: 1000*60*20   //过期时间20分钟
	}
}));

//设置视图存放位置
app.set('views', path.join(__dirname, 'views'));
//设置模板
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//设置静态文件存放目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
	//设置res.locals
	res.locals.user = req.session.user;
	var err = req.session.error;
	if (err) {
		res.locals.message = err;
	}
	next();
});

//路由
require('./routes')(app);

//首页
app.get('/', function (req, res) {
	res.render('login');
});

//app.listen(5081);

module.exports = app;

