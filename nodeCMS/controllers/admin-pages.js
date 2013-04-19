var database = require('../services/database');
var mongoose = require('mongoose');

/** ACTIONS **/

exports.pages = function(req,res){
	database.getStore('pages')
		.where('')
		.sort('name')
		.exec(function(err, pages){	
			res.render('admin-page-list', {files: pages});
		});
};

exports.editPage = function(req, res){
	if(req.params.id == 'new'){
		res.render('admin-edit');
	} else {	
		var page = database.getStore('pages').findOne(
			{ url: req.params.id },
			function(err, page){			
				res.render('admin-edit', page);	
			}
		);		
	}
};

exports.deletePage = function(req,res) {
	database.getStore('pages').findOne(
		{ name: req.params.id },
		function(err, page){
			page.remove();
			page.save();
			
			res.send('Boom!');
		}
	);
};

exports.savePage = function(req, res) {	
	var model = {
		name: req.param('name'),
		url: req.param('url'),
		content: req.param('content'),
		type: req.param('type'),
		template: 'page'
	};
	
	if(req.params.id == 'new'){
		_saveNewPage(model);
		res.redirect('/admin/pages/' + model.url);
	} else {
		_savePageEdit(model, req.params.id);
	}
	
	res.render('admin-edit', model);
};


/** PRIVATES **/

function _savePageEdit(model, pageUrl){
	database.getStore('pages').findOne(
		{ url: pageUrl },
		function(err, page) {				
			page.name = model.name;
			page.url = model.url;
			page.content = model.content;
			page.type = model.type;
			page.template = model.template;
			
			page.save();
			
			console.log('Updated page ' + page.url);
		}
	);
};

function _saveNewPage(model){
	var pageEntity = mongoose.model('pages');
	var page = new pageEntity({
			name: model.name,
			url: model.url,
			content: model.content,
			type: model.type,
			template: model.template
		});
		
		page.save(function(err){
			if(!err){
				console.log('Saved paged!');
			}
		});
};