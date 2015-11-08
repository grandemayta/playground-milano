'use strict';

var app = angular.module('app.access', [])

    .controller('LoginSocialController', [
        '$rootScope', '$scope', '$state', 'OAuthService', 'RestService', 'localStorageService',
        require('./LoginSocialController')
    ])

    .controller('LoginController', [
        '$rootScope', '$scope', '$state', 'RestService', 'localStorageService',
        require('./LoginController')
    ])

    .controller('RegistrationController', [
        '$rootScope', '$scope', '$state', 'RestService', 'localStorageService', 'DialogsService',
        require('./RegistrationController')
    ])

    .controller('GenerateCodeController', [
        '$scope', '$state', 'RestService',
        require('./GenerateCodeController')
    ])

    .controller('ResetPasswordController', [
        '$scope', '$state', 'RestService', 'DialogsService', 'localStorageService',
        require('./ResetPasswordController')
    ]);

module.exports = app;