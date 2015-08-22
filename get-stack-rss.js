var request = require('request'); 	// https://github.com/request/request
var xml2js 	= require('xml2js'); 	// https://github.com/Leonidas-from-XIV/node-xml2js
var async 	= require('async'); 	// https://github.com/caolan/async


request('http://stackoverflow.com/feeds/featured', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body) 
    var parser;
	parser = new xml2js.Parser({ignoreAttrs: true});
	parser.parseString(body, function (err, result) {

		postEntries = result['feed']['entry'];


			async.each(postEntries, function(entry, callback) {

			  console.log(entry['title'][0]);


			  callback();
			}, function(err){

			    if( err ) {
			      console.log('ERR');
			    } else {
			      console.log('###');
			    }
			});

		
	});
  }
})