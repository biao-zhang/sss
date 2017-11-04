module.exports = function (app) {
	app.get('/addCommodity', function (req, res) {
		res.render('addCommodity');
	});

	app.post('/addCommodity', function (req, res) {
		var addCommodity = global.dbHandle.getModel('addCommoditys');
		var cname = req.body.cname;
		var cprice = req.body.cprice;
		var imgSrc = req.body.imgSrc;

		addCommodity.create({
			cname: cname,
			cprice: cprice,
			imgSrc: imgSrc
		}, function (err, doc) {
			if (err) {
				console.log('商品创建失败');
				console.log(err);
				res.send(404);
			} else {
				console.log('商品创建成功');
				res.send(200);
			}
		});
	});

}