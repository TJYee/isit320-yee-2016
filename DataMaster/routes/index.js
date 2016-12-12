var router = require('./Couch');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'DataMaster Refactor'
    });
});

router.get('/:id', function(request, response) {
    'use strict';
    response.render(
        request.params.id, {
            title: request.params.id
        }
    );
});

module.exports = router;
