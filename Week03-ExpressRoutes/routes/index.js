var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Yee'
    });
});

router.get('/read', function(request, response) {
    'use strict';
    console.log('read mehtod called');
    response.send([{
        name: 'SarahLee'
    }, {
        name: 'Bob'
    }]);
});

router.get('/add', function(request, response) {
    'use strict';
    console.log('add method called');
    console.log('The parameters are:', request.query);
    var result = parseInt(request.query.operatorA) + parseInt(request.query.operatorB);
    response.send([
        result
    ]);
});

module.exports = router;
