
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var index = require('./routes/index');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))
app.all('*',index.all);
app.options('*',index.options);

app.use(function(req, res, next) {
	  req.headers['if-none-match'] = 'no-match-for-this';
	  next();    
});

app.get('/', index.get_homepage);
app.get('/suchi', index.get_homepage);

app.post('/', index.upload);
app.post('/suchi', index.upload);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
