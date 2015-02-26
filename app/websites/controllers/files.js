var FileView = require('../views/files.js'),
	FileModel= require('../models/files.js');

var Files = function  (conf) {
	conf = conf || {};
	this.view = new FileView();
	this.model = new FileModel();

	this.response = function () {
		this[conf.funcionalidad](conf.req, conf.res, conf.next);
	}
}


	Files.prototype.post_save = function(req, res, next) {
		this.model.save(req.body,function(doc){
			res.redirect('/files/see/'+ doc.slug)
		})
	};


	Files.prototype.get_see_data = function(req, res, next) {
		var object = {};
		var self = this;
		this.model.get({slug:req.params.data},function(doc){
			object.files = doc[0];
			self.view.see(res, object);
		});
	};

	Files.prototype.get_add = function(req, res, next) {
		var object = {nombre:'listar'};
		this.view.add(res, object);
	};


	Files.prototype.get_list = function(req, res, next) {
		var object = {nombre:'listar'};
		this.view.list(res, object);
	};

	Files.prototype.get_edit_data = function(req, res, next) {
		var object = {nombre:'editar'};
		this.view.edit(res, object);
	};
module.exports = Files;