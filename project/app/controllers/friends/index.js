'use strict';

var app = angular.module('app.friends', [])

    .controller('FriendsController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./FriendsController')
    ]);

module.exports = app;