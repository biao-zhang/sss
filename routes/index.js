module.exports = function (app) {
	require('./login')(app);
	require('./register')(app);
	require('./home')(app);
	require('./addCommodity')(app);
	require('./cart')(app);
	require('./logout')(app);
}