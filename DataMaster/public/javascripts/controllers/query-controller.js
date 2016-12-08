define(function() {
    var queryController = function ($scope, result) {
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

    queryController.delete = function($q) {
        'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.statesBulk = function($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=States.json', $q);
    };

    queryController.statesOneDoc = function($q) {
        'use strict';
        return runQuery('/insertFile?fileName=States.json&id=oneDoc', $q);
    };

    //Npcs code
    queryController.NpcsBulk = function($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.NpcsOneDoc = function($q) {
        'use strict';
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.viewNpcs = function($q) {
        'use strict';
        return runQuery('/viewNpcs?designDoc=states&view=docNpcs', $q);
    };

    queryController.viewNpcsValue = function($q) {
        'use strict';
        return runQuery('/viewNpcsValue?designDoc=states&view=docNpcsValue', $q);
    };

    queryController.viewNpcsQA = function($q) {
        'use strict';
        return runQuery('/viewNpcsQA?designDoc=states&view=docNpcsQA', $q);
    };
    //End of Npcs code
    queryController.design = function($q) {
        'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.readOne = function($q) {
        'use strict';
        return runQuery('/read?designDoc=states&view=viewOneDoc', $q);
    };

    queryController.viewBulk = function($q) {
        'use strict';
        return runQuery('/viewBulk?designDoc=states&view=docBulk', $q);
    };

    queryController.viewOneDoc = function($q) {
        'use strict';
        return runQuery('/viewOneDoc?designDoc=states&view=docStatesDoc', $q);
    };

    queryController.viewBulkAngular = function($q) {
        'use strict';
        return runQuery('/viewStateCapitalAngular?designDoc=states&view=docStateCapital', $q);
    };

    return queryController;
});