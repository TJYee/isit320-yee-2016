function designDocs(router, nano, dbName) {
    'use strict';

    var firstAndLast = function(doc) {
        if (doc.firstName && doc.lastName) {
            var name = doc.firstName + ' ' + doc.lastName;
            emit(doc._id, name);
        }
    };

    var lastOnly = function(doc) {

        if (doc.firstName && doc.lastName) {
            var name = doc.lastName;
            emit(doc._id, name);
        }
    };

    var docIdDoc = function(doc) {
        emit(doc._id, doc);
    };

    var docBulk = function(doc) {
        emit(doc._id, doc.name);
    };

    var docStateCapital = function(doc) {
        emit(doc.abbreviation, {
            'name': doc.name,
            'capital': doc.capital
        });
    };

    var docStatesDoc = function(doc) {
        if (doc._id === 'statesDoc') {
            var data = [];
            doc.docs.forEach(function(state) {
                data.push({
                    'name': state.name,
                    'capital': state.capital
                });
            });
            emit(doc.docs[0].abbreviation, data);
        }
    };

    var docNpcs = function(doc) {
        emit(doc.npc_id, {
            'id': doc.id,
            'npc_id': doc.npc_id,
            'npc_name': doc.npc_name,
            'description': doc.description,
            'color': doc.color,
            'value': doc.value,
            'question': doc.question,
            'answer': doc.answer
        });
    };

    var docNpcsValue = function(doc) {
        emit(doc.npc_id, {
            'npc_name': doc.npc_name,
            'value': doc.value
        });
    };

    var docNpcsQA = function(doc) {
        emit(doc.npc_id, {
            'npc_name': doc.npc_name,
            'question': doc.question,
            'answer': doc.answer
        });
    };

    /*
     var viewStatesDoc = function(doc) {
     if (doc._id === 'statesDoc') {
     var data = [];
     doc.docs.forEach(function(state) {
     emit({
     'name' : state.name,
     'capital' : state.capital
     }, 1);
     });
     emit(doc.docs[0].abbreviation, data);
     }
     }

     var docStatesHtml = function(doc) {
     start({
     'headers' : {
     'Content-Type' : 'text/html'
     }
     });
     send('<html><body><table>');
     send('<tr><th>ID</th><th>Key</th><th>Value</th></tr>')
     while (row = viewStatesDoc()) {
     send(''.concat('<tr>', '<td>' + toJSON(row.name) + '</td>', '<td>'
     + toJSON(row.capital) + '</td>', '<td>' + toJSON(row.value)
     + '</td>', '</tr>'));
     }
     send('</table></body></html>');

     }*/

    function createDesignDocument(designDocument, designName, response) {
        var nanoDb = nano.db.use(dbName);
        nanoDb.insert(designDocument, designName, function(error, body) {
            if (!error) {
                console.log(body);
                response.send(body);
            } else {
                console.log('error: ' + error);
                response.send({
                    'Result': 'The document might already exist. ' + error
                });
            }
        });
    }

    router.get('/insertDesignDoc', function(request, response) {

        console.log('Design Doc Called');

        var designName = '_design/states';
        var designDocument = {
            'views': {
                'docBulk': {
                    'map': docBulk
                },
                'docIdDoc': {
                    'map': docIdDoc
                },
                'docStateCapital': {
                    'map': docStateCapital
                },
                'docStatesDoc': {
                    'map': docStatesDoc
                },
                'docNpcs': {
                    'map': docNpcs
                },
                'docNpcsValue': {
                    'map': docNpcsValue
                },
                'docNpcsQA': {
                    'map': docNpcsQA
                }
                /*,
                 'viewStatesDoc' : {
                 'map' : viewStatesDoc
                 },
                 'docStatesHtml' : {
                 'map' : docStatesHtml
                 }*/
            }
        };

        createDesignDocument(designDocument, designName, response);
    });

}

module.exports = designDocs;
