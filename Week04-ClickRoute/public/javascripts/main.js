/**
 * @author Charlie Calvert
 */

require.config({
    paths: {
        'jquery': '../components/jquery/dist/jquery.min',
        'ClickEvents': '../javascripts/ClickEvents'
    }
});

require(['jquery', 'ClickEvents'], function($, ClickEvents) {
    'use strict';

    console.log('Main called');
    $(document).ready(function() {
        var clickEvents = new ClickEvents();
    });
});
