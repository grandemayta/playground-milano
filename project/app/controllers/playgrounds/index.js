'use strict';

var app = angular.module('app.playgrounds', [])

    .controller('PlaygroundsMapController', [
        '$rootScope', '$scope', '$timeout', 'RestService',
        require('./PlaygroundsMapController')
    ])

    .controller('PlaygroundsListController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./PlaygroundsListController')
    ]);

module.exports = app;