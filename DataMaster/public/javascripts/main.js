/**
 * @author: Charlie Calvert
 * @name: main.js
 * Created on 10/10/16.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'jquery': '/components/jquery/dist/jquery',
        'control': '/javascripts/Control',
        'nameController': '/javascripts/controllers/name-controller',
        'queryController': '/javascripts/controllers/query-controller',
        'Route': '/javascripts/route',
        'runQuery': '/javascripts/run-query'
    }
});


requirejs(['jquery'], function($) {
    'use strict';

    requirejs(['Route', 'control'], function(Route, control) {
        $(document).ready(function() {

            var route = new Route();
            /*
             * User clicks control
             * Create Route
             * Tell Route which route was selected
             * Call findRoutes and pass in Routes object
             *   findRoutes calls route.when for each possible path
             */
            $('#databaseOptions ul li a').click(function (event) {
                event.preventDefault();
                route.setRoute(event.target.pathname);
                control(route);
            });

        });
    });
});