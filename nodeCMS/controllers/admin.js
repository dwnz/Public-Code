var database = require('../services/database');
var mongoose = require('mongoose');
require('date-utils');

exports.index = function(req,res){
	database.getStore('analytics')
		.where('hittime')
			.gt(new Date().addDays(-1))
		.count(function(err,count){
			var model = {
				hits:	count
			};
			
			res.render('admin-dashboard', model);
		});
};