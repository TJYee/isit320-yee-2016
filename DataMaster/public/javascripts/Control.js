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

define(['Route', 'nameController', 'queryController'], function(Route, nameController, queryController) {
    'use strict';
    var findRoutes = (function($routeProvider) {
        $routeProvider.when('/databaseName', {
            templateUrl: '/display-default',
            controller: nameController,
            resolve: {
                databaseName: nameController.databaseName,
                allDbs: nameController.allDbs
            }
        }).when('/deleteDb', {
            templateUrl: 'display-default',
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
            redirectTo: '/home'
        });
    });

    return findRoutes;

});
