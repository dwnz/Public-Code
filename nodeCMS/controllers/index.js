var database = require('../services/database');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.index = function (req, res) {
	var pageUrl;

	if (req.params.url === undefined) {
		pageUrl = 'home';
	} else {
		pageUrl = req.params.url;
	}
	
	_logHit(pageUrl, req);
	
	try {
		var page = database.getStore('pages').findOne(
			{ url: pageUrl },
			function(err, page) {
				if(page) {
					switch(page.type){
						case "json":
							res.send(page);
							break;
					
						default:				
							res.render(page.template, page);
							break;
					}
				} else {
					res.send(404,'Page not found');
				}
			}
		);
	} catch(e){
		res.send(500,'Server error');
	}
};

function _logHit(pageUrl, req){
	var logEntity = mongoose.model('analytics');	
	var log = new logEntity({
		hittime: new Date(),
		page: pageUrl,
		ip: req.connection.remoteAddress,
		useragent: req.headers['user-agent']
	});
	log.save(function(err){
		console.log(err);
	});
}