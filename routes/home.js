module.exports = function (app) {
	app.get('/home', function (req, res) {
		if (req.session.user) {
			var addCommodity = global.dbHandle.getModel('addCommoditys');
			addCommodity.find({}, function (err, docs) {
				if (err) {
					console.log('网络错误');
					res.sendStatus(500);
				} else {
					res.render('home', {addCommoditys: docs});
				}
			});
			
		} else {
			req.session.error = '请先登录';
			res.redirect('/login');
		}
		
	});
}