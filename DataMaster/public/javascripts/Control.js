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

define(['Route', 'queryController', 'nameController', 'insertController', 'bulkController'],
    function(Route, queryController, nameController, insertController, bulkController) {
        'use strict';
        var path = require("path");
        console.log(". = %s", path.resolve("."));
        console.log("__dirname = %s", path.resolve(__dirname));
        var findRoutes = (function($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: '/home',
                controller: queryController,
                resolve: {
                    init: queryController.init
                }
            }).when('/databaseName', {
                templateUrl: '/display-default',
                controller: nameController,
                resolve: {
                    databaseName: nameController.databaseName,
                    allDbs: nameController.allDbs
                }
            }).when('/deleteDb', {
                templateUrl: '/display-default',
                controller: queryController,
                resolve: {
                    result: queryController.delete
                }
            }).when('/createDb', {
                templateUrl: '/display-default',
                controller: queryController,
                resolve: {
                    result: queryController.create
                }
            }).when('/insertNpcsBulk', {
                templateUrl: '/display-default',
                controller: bulkController,
                resolve: {
                    result: bulkController.insertNpcsBulk
                }
            }).when('/insertNpcsOneDoc', {
                templateUrl: '/display-default',
                controller: insertController,
                resolve: {
                    result: insertController.insertNpcsOneDoc
                }
            }).when('/insertDesignDoc', {
                templateUrl: '/display-default',
                controller: insertController,
                resolve: {
                    result: insertController.insertDesignDoc
                }
            }).when('/readOne', {
                templateUrl: '/display-default',
                controller: queryController,
                resolve: {
                    result: queryController.readOne
                }
            }).when('/viewNpcsBulk', {
                templateUrl: '/row-display-bulk',
                controller: bulkController,
                resolve: {
                    result: bulkController.viewNpcsBulk,
                    init: bulkController.init
                }
            }).when('/viewNpcsOneDoc', {
                templateUrl: '/display-default',
                controller: queryController,
                resolve: {
                    result: queryController.viewNpcsOneDoc
                }
            }).otherwise({
                redirectTo: '/display-default'
            });
        });

        return findRoutes;

    });
