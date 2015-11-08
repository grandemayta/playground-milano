'use strict';

var app = angular.module('app.menu', [])

    .controller('MenuController', [
        '$rootScope', '$scope', '$state', 'localStorageService', 'RestService',
        require('./MenuController')
    ]);

module.exports = app;