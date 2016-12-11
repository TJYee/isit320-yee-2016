/**
 * @name Control
 */


$(document).ready(function() {
    'use strict';

    var data = [];
    var index = 0;

    $('#read').click(function() {
        $.getJSON('/viewNpcsBulk?designDoc=states&view=docNpcs', function(json) {
            $('#debug').empty();
            data = [];
            for (var i = 0; i < json.length; i++) {
                data.push(json[i].value);
            }
            if (data[index] !== null) {
                emptyInput();
                $('#index').val('Index: ' + index);
                $('#npcName').val(data[index].npc_name);
                $('#npcDescription').val(data[index].description);
                $('#npcID').val(data[index].id);
                $('#npcQuestion').val(data[index].question);
            } else {
                emptyInput();
                $('#index').val('No Data Found');
            }
        }).fail(function(jqxhr, textStatus, error) {
            var response = JSON.parse(jqxhr.responseText);
            response.genericError = error;
            response.statusText = textStatus;
            $('#debug').html(JSON.stringify(response));
        });
    });

    $('#back').click(function() {
        if (index > 0) {
            index--;
            emptyInput();
            $('#index').val('Index: ' + index);
            $('#npcName').val(data[index].npc_name);
            $('#npcDescription').val(data[index].description);
            $('#npcID').val(data[index].id);
            $('#npcQuestion').val(data[index].question);
        }
    });

    $('#forward').click(function() {
        if (index < data.length - 1) {
            index++;
            emptyInput();
            $('#index').val('Index: ' + index);
            $('#npcName').val(data[index].npc_name);
            $('#npcDescription').val(data[index].description);
            $('#npcID').val(data[index].id);
            $('#npcQuestion').val(data[index].question);
        }
    });

    function emptyInput() {
        $('#index').val('');
        $('#npcName').val('');
        $('#npcDescription').val('');
        $('#npcID').val('');
        $('#npcQuestion').val('');
    }
});

define(['Route', 'nameController', 'queryController'], function (Route, nameController, queryController) {
    'use strict';
    var findRoutes = (function ($routeProvider) {
        $routeProvider.when('/databaseName', {
            templateUrl: '/index',
            controller: nameController,
            resolve: {
                databaseName: nameController.databaseName,
                allDbs: nameController.allDbs
            }
        }).when('/deleteDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).when('/createDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/insertNpcsBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsBulk
            }
        }).when('/insertNpcsOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsOneDoc
            }
        }).when('/insertDesignDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.insertDesignDoc
            }
        }).when('/readOne', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.readOne
            }
        }).when('/viewNpcsBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewNpcsBulk
            }
        }).when('/viewNpcsOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewNpcsOneDoc
            }
        }).otherwise({
            redirectTo: '/index'
        });
    });

    return findRoutes;

});

///// OLD CODE /////
/*
//var myModule = angular.module('myModule', ['ngRoute']);

/!*
function runQuery(query, $q) {
    'use strict';
    var defers = $q.defer();
    $.getJSON(query, function(json) {
        defers.resolve(json);
    }).fail(function(jqxhr, textStatus, error) {
        var response = JSON.parse(jqxhr.responseText);
        response.genericError = error;
        response.statusText = textStatus;
        defers.resolve({
            'requestFailed': response
        });
    });
    return defers.promise;
}*!/





myModule.config(function($routeProvider) {
    'use strict';
    $routeProvider.when('/databaseName', {
        templateUrl: 'templates/DatabaseNames.html',
        controller: 'NameController',
        resolve: {
            databaseName: nameController.databaseName,
            allDbs: nameController.allDbs
        }
    }).when('/deleteDb', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.delete
        }
    }).when('/createDb', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.create
        }
    }).when('/insertStatesBulk', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.statesBulk
        }
    }).when('/insertStatesOneDoc', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.statesOneDoc
        }
    }).when('/insertDesignDoc', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.design
        }
    }).when('/readOne', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.readOne
        }
    }).when('/viewBulk', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewBulk
        }
    }).when('/viewOneDoc', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewOneDoc
        }
    }).when('/viewBulkStatesCapital', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewBulkAngular
        }
        // Npcs code
    }).when('/insertNpcsBulk', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.NpcsBulk
        }
    }).when('/insertNpcsOneDoc', {
        templateUrl: 'templates/States.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.NpcsOneDoc
        }
    }).when('/viewNpcs', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewNpcs
        }
    }).when('/viewNpcsValue', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewNpcsValue
        }
    }).when('/viewNpcsQA', {
        templateUrl: 'templates/QueryView.html',
        controller: 'QueryController',
        resolve: {
            result: queryController.viewNpcsQA
        }
    }).otherwise({
        redirectTo: '/'
    });
});
*/
