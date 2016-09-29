var fs = require('fs');

var foo = fs.readFileSync('index.json');

// Asynch
fs.readFile('./index.json', 'utf8', function(err, rawJson) {
	if (err) {
		throw err;
	}
	
	var json = JSON.parse(rawJson);
	console.log(json);
	console.log('---- Loop ----');
	for (aProperty in json) {
		console.log(aProperty, typeof json[aProperty]);
	};
});
