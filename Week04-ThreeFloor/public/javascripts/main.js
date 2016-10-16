requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'Three': 'javascripts/three',
        'control': 'javascripts/control',
        'floor': 'javascripts/floor'
    },
    shim: {
        'Three': {
            exports: 'THREE'
        }
    }
});

requirejs(['jquery'], function() {
    'use strict';
    requirejs(['bootstrap', 'Three', 'control'], function(bootstrap, THREE, Control) {
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
