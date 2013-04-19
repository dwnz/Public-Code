var fs = require('fs');
/** ACTIONS **/
exports.editTemplate = function(req, res) {
	var path = __dirname.replace('controllers','views') + '/page.hjs';
	var file = loadFileSync(path);
	
	res.render('admin-template', {content: file});
};

exports.saveTemplate = function(req, res) {
	var path = __dirname.replace('controllers','views') + '/page.hjs';
	
	fs.writeFileSync(path, req.param('template'));

	res.render('admin-template', {content: req.param('template')});
};

function loadFileSync(fileName){
	var exists = fs.existsSync(fileName);
	
	if(exists){
		return fs.readFileSync(fileName);
	} else {
		throw "File not found";
	}
}