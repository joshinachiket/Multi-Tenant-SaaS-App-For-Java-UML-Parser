/*
 * GET home page.
 */

var formidable = require('formidable');
var fs = require('fs');
var unzip = require('unzip');
var exec = require('child_process').exec;
var errors = require('errors');

var get_homepage = function (req, res) {
	res.render('index');
};

var upload = function (req, res) {
	
	console.log("control caught in upload HTTP POST request");
	
	 var form_incoming = new formidable.IncomingForm();

	    form_incoming.parse(req);
	    form_incoming.on('fileBegin', function (name, file){
	    	var dir = './public/uploads/';
	        if (!fs.existsSync(dir)){
	        	fs.mkdirSync(dir);
	        }
	        file.path = dir + file.name;
	    });

	    form_incoming.on('file', function (name, file){
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
		    			
		    			//exec('java -jar ./public/uml_parser/UmlParser.jar '+'.'+extractedFilePath+' '+outputFile,
		    			exec('java -jar ./public/uml_parser/UmlParser.jar .'+extractedFilePath+' output',		
		    			        function (error, stdout, stderr){
		    				    if(error !== null){
		    				    	console.log("Error -> "+error);
		    				    	res.send({'path':'./public/images/server_error.png'});
		    				    } else {
		    				    	console.log("Uml Diagram has been Generate");
		    				    	var outputFilePath = '.'+extractedFilePath+'/'+outputFile+'.png';
		    				    	console.log(outputFilePath);
		    				    	res.send({'path':outputFilePath});
		    				    }
		    			});
	    			}
	    		});
	    });
};

module.exports = { get_homepage, upload}