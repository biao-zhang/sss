//var http = require('http');

var app = require('express')();

//http.createServer(app).listen(8000);

app.use(function (req, res, next) {
	//console.log(err.message);
	res.locals.message = 'Not Found';
	console.log('Time: %d', Date.now());
	console.log('你好啊啊');
	console.log(res.locals.message);
	/*var err = new Error('Not Found');
	err.status = 404;*/  //写不写都是这个值，那么有什么用呢
	next();//个人理解：代表着这一次请求结束，开始下一次请求处理
});

app.listen(8000);

console.log('Server running at localhost:8000');