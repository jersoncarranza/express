var Files = function  (conf) {
	conf = conf || {};
	
}


	Files.prototype.see = function(res, object) {res.render('see', object);}
	Files.prototype.add = function(res, object) {res.render('add', object);}
	Files.prototype.list = function(res, object) {res.render('add', object);}
	Files.prototype.edit = function(res, object) {res.render('add', object);}

module.exports = Files;