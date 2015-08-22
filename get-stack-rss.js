var request = require('request'); 	// https://github.com/request/request
var xml2js 	= require('xml2js'); 	// https://github.com/Leonidas-from-XIV/node-xml2js
var async 	= require('async'); 	// https://github.com/caolan/async


request('http://stackoverflow.com/feeds/featured', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    //console.log(body) 
    var parser;
	parser = new xml2js.Parser({ignoreAttrs: false});
	parser.parseString(body, function (err, result) {

		postEntries = result['feed']['entry'];


			async.each(postEntries, function(entry, callback) {

			  // parse main part of post
			  console.log(entry['id'][0]);
			  console.log(entry['title'][0]._);
			  console.log(entry['link'][0].$.href);
			  console.log(entry['published'][0]);
			  console.log(entry['author'][0]['name'][0]);
			  console.log(entry['author'][0]['uri'][0]);

			  // parse tags (there can only ever be 5 so we just check them all)
			  if (typeof(entry['category'][0]) != "undefined") {
				console.log(entry['category'][0].$.term);
			  }
			  if (typeof(entry['category'][1]) != "undefined") {
				console.log(entry['category'][1].$.term);
			  }
			  if (typeof(entry['category'][2]) != "undefined") {
				console.log(entry['category'][2].$.term);
			  }
			  if (typeof(entry['category'][3]) != "undefined") {
				console.log(entry['category'][3].$.term);
			  }
			  if (typeof(entry['category'][4]) != "undefined") {
				console.log(entry['category'][4].$.term);
			  }



			  console.log('');


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