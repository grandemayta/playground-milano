'use strict';

var app = angular.module('app.playground', [])

    .controller('PlaygroundHomeController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./PlaygroundHomeController')
    ])

    .controller('PlaygroundCheckinsController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./PlaygroundCheckinsController')
    ])

    .controller('PlaygroundCommentsController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./PlaygroundCommentsController')
    ]);

module.exports = app;