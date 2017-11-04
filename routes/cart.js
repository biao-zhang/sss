module.exports = function (app) {
	//查看购物车商品
	app.get('/cart', function (req, res) {
		if (!req.session.user) {
			req.session.error = '用户已过期';
			res.redirect('/login');
		} else {
			var Cart = global.dbHandle.getModel('carts');
			Cart.find({'uId': req.session.user._id, 'sStatus': false}, function (err, docs) {
				if (err) {
					console.log('网络错误');
					res.send(500);
				} else {
					res.render('cart', {carts:docs});
				}
			});
		}
	});

	//添加购物车商品
	app.get('/addToCart/:id', function (req, res) {
		if (!req.session.user) {
			req.session.error = '用户已过期';
			res.redirect('/login');
		} else {
			var addCommodity = global.dbHandle.getModel('addCommoditys');
			var Cart = global.dbHandle.getModel('carts');

			Cart.findOne({'uId': req.session.user._id, 'sId': req.params.id}, function (err, doc) {
				if (err) {
					console.log('网络错误');
					res.send(500);
					//商品已经存在+1
				} else if (doc){
					Cart.update({'uId': req.session.user._id, 'sId': req.params.id}, {$set: {sQuantity: doc.sQuantity+1}}, function (err, doc) {
						//成功返回1，失败返回0
						if (doc>0) {
							console.log('数据更新成功');
							res.redirect('/home');
						}
					});
					//商品未存在，创建
				} else {
					addCommodity.findOne({'_id': req.params.id}, function (err, doc) {
						if (err) {
							res.send(500);
						} else {
							Cart.create({
								uId: req.session.user._id,
								sId: req.params.id,
								sPrice: doc.cprice,
								sName: doc.cname,
								sImgSrc: doc.imgSrc,
								sQuantity: 1,
								sStatus: false
							}, function (err, doc) {
								if (err) {
									console.log('商品创建失败');
									res.send(404);
								} else {
									console.log('商品创建成功');
									res.redirect('/home');
								}
							});
						}
						
					});
					
				}
			});
		}
	});
//删除
app.get('/delCart/:id', function (req, res) {
	var Cart = global.dbHandle.getModel('carts');

	Cart.remove({'_id': req.params.id}, function (err, doc) {
		if (doc > 0) {
			res.redirect('/cart');
		} else {
			console.log('删除失败');
		}
	});
});

//结算
app.post('/cart/clearing', function (req, res) {
	var Cart = global.dbHandle.getModel('carts');

	Cart.update({'_id': req.body.cid}, {$set: {'sQuantity': req.body.cnum, 'sStatus': true}}, function (err, doc) {
		if (doc > 0) {
			console.log('结算成功');
			res.send(200);
		}
	});
});
}