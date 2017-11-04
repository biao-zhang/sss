module.exports = function (app) {
	app.get('/register', function (req, res) {
		res.render('register');
	});

	app.post('/register', function (req, res) {
		var User = global.dbHandle.getModel('users');
		var uname = req.body.uname;
		var pwd = req.body.pwd;
		var _pwd = req.body._pwd;
		
		User.findOne({name: uname}, function (err, doc) {
			if (err) {
				console.log('网络错误');
				req.session.error = '网络错误';
				res.send(500);
			} else if (doc) {
				console.log('用户名已经存在');
				req.session.error = '用户名已经存在';
				res.send(500);
			} else if (_pwd != pwd) {
				console.log('两次密码输入不一致');
				res.send(501);
			} else {
				User.create({
						name: uname,
						password: pwd
					}, function (err, doc) {
						if (err) {
							console.log('创建失败');
							res.send(404);
						} else {
							console.log('创建成功');
							req.session.error = '注册成功';
							res.send(200);
						}
				});
			}
		});
	});
}
