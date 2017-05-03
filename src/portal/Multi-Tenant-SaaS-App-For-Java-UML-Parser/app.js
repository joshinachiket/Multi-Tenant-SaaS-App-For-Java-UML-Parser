
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
app.use('/templates/public', express.static('public'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(function(req, res, next) {
	  req.headers['if-none-match'] = 'no-match-for-this';
	  next();    
});

app.get('/', index.upload_get);
app.post('/', index.upload_post);
app.post('/enterTenantOneInfo', index.enterTenantOneInfo);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
