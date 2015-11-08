'use strict';

var app = angular.module('app.checkin', [])

    .controller('CheckinController', [
        '$rootScope', '$scope', '$state', 'RestService', 'DialogsService',
        require('./CheckinController')
    ]);

module.exports = app;