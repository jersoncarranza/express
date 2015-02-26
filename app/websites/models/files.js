var mongoose = require('mongoose');
var modelArticle = require('./schema/files.js');

var Files = function  (conf) {
	conf = conf || {};
	this.model = modelArticle;
}

//guardar y actualizar
Files.prototype.save = function(data,callback) {
	console.log(data.title);
	this.model.findOneAndUpdate({
		title:data.title,
		slug:data.slug,
		content:data.content
	},data,{upsert:true}).exec(function(err,doc){
		callback(doc);
	});
}

Files.prototype.get = function(query,callback) {
	this.model.find(query).exec(function(err, doc){
		callback(doc)
	})
}
module.exports = Files;