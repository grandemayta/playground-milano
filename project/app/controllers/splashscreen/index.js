'use strict';

var app = angular.module('app.splashscreen', [])

    .controller('SplashscreenController', [
        '$rootScope', '$scope', '$state', '$interval',
        require('./SplashscreenController')
    ]);

module.exports = app;