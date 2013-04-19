var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
   name			: String,
   url			: String,
   content		: String,
   type			: String,
   template		: String
});

var templateSchema = new Schema({
	name		: String,
	content		: String,
	type		: String
});

var analyticsSchema = new Schema({
	hittime		: Date,
	ip			: String,
	page		: String,
	useragent	: String
});

mongoose.connect('mongodb://127.0.0.1:27017/nodeCMS');
mongoose.model('pages', pageSchema);
mongoose.model('templates', templateSchema);
mongoose.model('analytics', analyticsSchema);

exports.getStore = function(storeName){
	return mongoose.model(storeName);
}