var models = require('./model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

for (m in models) {
	mongoose.model(m, new Schema(models[m]));
}

module.exports = {
	getModel: function (type) {
		return mongoose.model(type);
	}
}   //其实这样已经可以了

//为什么还要这样做
/*module.exports = {
	getModel: function (type) {
		return _getModel(type);
	}
}   

var _getModel = function (type) {
	return mongoose.model(type);
}*/