module.exports = function (req, res, next){
	res.locals.nick = 'Diegoug';
	res.locals.authors = ['Paul', 'Jim', 'Jane'];
	next();
};