
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.details = function(req, res){
	res.send("Hello " + req.params.id);
};