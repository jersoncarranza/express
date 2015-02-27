var Files = function  (conf) {
	conf = conf || {};
	
}


	Files.prototype.see = function(res, object) {res.render('see', object);}
	Files.prototype.add = function(res, object) {res.render('add', object);}
	Files.prototype.list = function(res, object) {res.render('list', object);}
	Files.prototype.chat = function(res, object) {res.render('chat', object);}

module.exports = Files;