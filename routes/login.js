module.exports = function (app) {
	app.get('/login', function (req, res) {
		res.render('login');
	});

	app.post('/login', function (req, res) {
		var User = global.dbHandle.getModel('users');
		var uname = req.body.uname;
		var pwd = req.body.pwd;
		User.findOne({name: uname}, function (err, doc) {
			if (err) {
				console.log('网络错误');
				res.send(500);
			} else if (!doc) {
				console.log('用户名不存在');
				req.session.error = '用户名不存在';
				res.send(404);
			} else {
				if (pwd !== doc.password) {
					console.log('密码不正确');
					res.send(404);
				} else {
					req.session.user = doc;
					res.send(200);
				}
			}
		});
	});
}