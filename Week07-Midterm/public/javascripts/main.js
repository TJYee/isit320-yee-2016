requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'Three': 'javascripts/three',
        'control': 'javascripts/control',
        'floor': 'javascripts/floor',
        'PointerLockControls': 'javascripts/PointerLockControls',
        'PointerLockSetup': 'javascripts/PointerLockSetup',
        'Score': 'javascripts/Score',
        'collisions': 'javascripts/collisions',
        'npcs': 'javascripts/npcs'
    },
    shim: {
        'Three': {
            exports: 'THREE'
        }
    }
});

requirejs(['jquery'], function() {
    'use strict';
    requirejs(['Three', 'control'], function(THREE, Control) {
        $(document).ready(function() {
            var control = new Control(THREE);
        });
    });
});
