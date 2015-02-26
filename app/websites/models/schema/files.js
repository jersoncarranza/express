var mongoose = require('mongoose'),
	Schema	 = mongoose.Schema;

var FileSchema = new Schema({
	title: {type:String, require:true},
	slug: {type:String, require:true},
	content: String
});
var File = mongoose.model('File', FileSchema);
module.exports = File;