'use strict';

var app = angular.module('app.settings', [])

    .controller('SettingsController', [
        '$rootScope',
        require('./SettingsController')
    ])

    .controller('LanguageController', [
        '$rootScope', '$scope', '$translate',
        require('./LanguageController')
    ]);

module.exports = app;