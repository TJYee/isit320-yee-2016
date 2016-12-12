define(['runQuery', 'utility'], function(runQuery, utility) {
    'use strict';

    var queryController = function(query, result) {
        utility.clearAll();
        if (query.requestFailed) {
            utility.failed(query.requestFailed);
            return;
        }
        var debug = $('#debug');
        var docs = $('#docs');
        if (result.ok) {
            var text = 'It worked';
            if (result.data) {
                text += '\n' + JSON.stringify(result.data, null, 4);
            }
            debug.html(text);
        } else if (result.error) {
            debug.html(result.error + ': ' + result.message);
        } else {
            debug.html(result);
        }
        docs.html(JSON.stringify(result.docs, null, 4));
    };

    function init() {
        $('#target').submit(function(event) {
            event.preventDefault();
            var userFormData = $(this).serialize();
            $('#formResults').html(userFormData);
            $.getJSON('/user-form?' + userFormData, function(result) {
                $('#debug').html(JSON.stringify(result, null, 4));
            });
        });

        $('#help').click(function() {
            $('#charlie').html('<strong>Help Text</strong>: Select some controls and press the Submit button.');
        });
    }

    queryController.init = function($q) {
        init();
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

    queryController.viewNpcsValue = function($q) {
        return runQuery('/viewNpcsValue?designDoc=states&view=docNpcsValue', $q);
    };

    queryController.viewNpcsQA = function($q) {
        return runQuery('/viewNpcsQA?designDoc=states&view=docNpcsQA', $q);
    };
    //End of Npcs code

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
