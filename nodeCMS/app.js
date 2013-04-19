/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./controllers'),
	user = require('./controllers/user'),
	admin = require('./controllers/admin'),
	template = require('./controllers/template'),
	adminPages = require('./controllers/admin-pages'),
	http = require('http'),
	path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('baseDir', __dirname);
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('passwordypassword'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Templates
app.get('/admin/template', template.editTemplate);
app.post('/admin/template', template.saveTemplate);

// Pages
app.get('/admin/pages/delete/:id', adminPages.deletePage);
app.post('/admin/pages/:id', adminPages.savePage);
app.get('/admin/pages/:id', adminPages.editPage);
app.get('/admin/pages', adminPages.pages);

// Admin
app.get('/admin', admin.index);

// All
app.get('/:url', routes.index);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
