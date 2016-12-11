define(['runQuery'], function (runQuery) {
    'use strict';

    var queryController = function (query, result) {
        var $scope = $('#debug');
        var docs = $('#docs');
        docs.empty();
        if (result.ok) {
            $scope.result = 'It worked';
        } else if (result.error) {
            $scope.result = JSON.stringify(result.requestFailed, null, 4);
        } else {
            $scope.result = result;
        }

        $scope.docs = result.docs;
    };

    queryController.delete = function($q) {
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        return runQuery('/createDb', $q);
    };

    queryController.statesBulk = function($q) {
        return runQuery('/insertBulk?fileName=States.json', $q);
    };

    queryController.statesOneDoc = function($q) {
        return runQuery('/insertFile?fileName=States.json&id=oneDoc', $q);
    };

    //Npcs code
    queryController.insertNpcsBulk = function($q) {
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.insertNpcsOneDoc = function($q) {
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.viewNpcsBulk = function($q) {
        return runQuery('/viewNpcsBulk?designDoc=states&view=docNpcs', $q);
    };

    queryController.viewNpcsValue = function($q) {
        return runQuery('/viewNpcsValue?designDoc=states&view=docNpcsValue', $q);
    };

    queryController.viewNpcsQA = function($q) {
        return runQuery('/viewNpcsQA?designDoc=states&view=docNpcsQA', $q);
    };
    //End of Npcs code
    queryController.insertDesignDoc = function($q) {
        return runQuery('/insertDesignDoc', $q);
    };

    queryController.readOne = function($q) {
        return runQuery('/read?designDoc=states&view=viewOneDoc', $q);
    };

    queryController.viewBulk = function($q) {
        return runQuery('/viewBulk?designDoc=states&view=docBulk', $q);
    };

    queryController.viewOneDoc = function($q) {
        return runQuery('/viewOneDoc?designDoc=states&view=docStatesDoc', $q);
    };

    queryController.viewBulkAngular = function($q) {
        return runQuery('/viewStateCapitalAngular?designDoc=states&view=docStateCapital', $q);
    };

    return queryController;
});