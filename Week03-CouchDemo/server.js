var nano = require('nano')('http://168.156.44.102:5984');
// var nano = require('nano')('http://168.156.44.102:5984');

var docName = 'bigNames';
var dbName = 'bc_data';

var readIt = function() {
    'use strict';
    var prog = nano.db.use(dbName);
    prog.get(docName, {
        revs_info: true
    }, function(err, body) {
        if (!err) {
            console.log(body);
        }
    });
};

function insert() {
    'use strict';
    nano.db.create(dbName);
    var prog = nano.db.use(dbName);
    prog.insert({
            'doc': [{
                'firstName': 'Suzie',
                'lastName': 'Higgins'
            }, {
                'firstName': 'Bob',
                'lastName': 'Ross'
            }, {
                'firstName': 'John',
                'lastName': 'Doe'
            }, {
                'firstName': 'John',
                'lastName': 'Johnson'
            }]
        },
        docName,
        function(err, body) {
            if (!err) {
                console.log(body);
            }
            readIt();
        });
}

insert();
// readIt();
