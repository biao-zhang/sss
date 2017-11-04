module.exports = {
	users: {
		name: {type: String, required: true},
		password: {type: String, required: true}
	},

	addCommoditys: {
		cname: {type: String, required: true},
		cprice: {type: String, required: true},
		imgSrc: {type: String}
	},

	carts: {
		uId: {type: String},
		sId: {type: String},
		sName: {type: String},
		sPrice: {type: String},
		sImgSrc: {type: String},
		sQuantity: {type: Number},
		sStatus: {type: Boolean, default: false} //结算的状态
	}
	//....
	//留着扩展
}