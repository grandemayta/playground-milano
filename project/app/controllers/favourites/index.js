'use strict';

var app = angular.module('app.favourites', [])

    .controller('FavouritesController', [
        '$rootScope', '$scope', '$state', 'RestService',
        require('./FavouritesController')
    ]);

module.exports = app;