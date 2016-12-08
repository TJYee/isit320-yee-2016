define(function(){

    var nameController = function($scope, result) {
        'use strict';
        if (result.ok) {
            $scope.result = 'It worked';
        } else if (result.requestFailed) {
            $scope.result = JSON.stringify(result.requestFailed, null, 4);
        } else {
            $scope.result = result;
        }

        $scope.docs = result.docs;
    };


    /*var nameController = myModule.controller('NameController', function($scope, databaseName, allDbs) {
        'use strict';
        $scope.databaseName = databaseName;
        $scope.allDbs = allDbs;
    });*/

    nameController.databaseName = function($q) {
        'use strict';
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function($q) {
        'use strict';
        return runQuery('/listDb', $q);
    };

    return nameController;
});