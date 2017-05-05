/*
 * GET home page.
 */

var formidable = require('formidable');
var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;
var errors = require('errors');
var ejs = require("ejs");
var mysql = require('./mysql');


//following function takes care of cross origin requests. this is because chrome blocks
//requests made to servers of other origins
var all = function(req, res, next) {
  // add details of what is allowed in HTTP request headers to the response headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  // the next() function continues execution and will move onto the requested URL/URI
  next();
};


var options = function(req, res) {
  res.sendStatus(200);
};


var upload_get = function (req, res) {
	res.render('index');
};

var upload_post = function (req, res) {
	
	console.log("control caught in upload_post");
	
	 var form = new formidable.IncomingForm();

	    form.parse(req);
	    form.on('fileBegin', function (name, file){
	    	var dir = './public/uploads/';
	        if (!fs.existsSync(dir)){
	        	fs.mkdirSync(dir);
	        }
	        file.path = dir + file.name;
	    });

	    form.on('file', function (name, file){
	    	// Unzip the file
	    	fs.createReadStream(file.path)
	    		.pipe(unzip.Extract({ path: './public/uploads/' }))
	    		.on('close',function(err) {
	    			
	    			if (err){
	    				res.send(new errors.errors.Http500Error());
	    			} else {
	    				// run the jar
		    			var extractedFilePath = file.path.substring(1,file.path.lastIndexOf('.'));
		    			var outputFile = 'output';
		    			
		    			exec('java -jar ./public/uml_parser/UmlParser.jar '+'.'+extractedFilePath+' '+outputFile,
		    					function (error, stdout, stderr){
		    				    if(error !== null){
		    				    	console.log("Error -> "+error);
		    				    	res.send({'path':'./public/images/server_error.png'});
		    				    } else {
		    				    	console.log("Uml Diagram Generate");
		    				    	var outputFilePath = '.'+extractedFilePath+'/'+outputFile+'.png';
		    				    	console.log(outputFilePath);
		    				    	res.send({'path':outputFilePath});
		    				    }
		    			});
	    			}
	    		});
	    });
};

var enterTenantOneInfo = function(req, res) {
	console.log("control reached my post method");

	console.log(req.body);
	
	var TenantInsertQuery = "INSERT INTO tenant_specific_data (tenant_id, correct, marks, comment) VALUES ('" + 
						req.body.tenant_id + 
						"','" + req.body.correctness + 
						"','" + req.body.marks + 
						"','" + req.body.comment +"')";

	console.log("QUERY to enter tenant details is: " + TenantInsertQuery);

	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			if (results.length > 0) {

				console.log("something went wrong!");
				var json_responses = {
					"statusCode" : 200
				};
				res.send(json_responses);

			} else {

				console.log("tenant details inserted!");
				json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);

			}
		}
	}, TenantInsertQuery);
};

module.exports = { upload_get, enterTenantOneInfo, upload_post, all, options}