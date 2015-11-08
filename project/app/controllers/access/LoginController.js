'use strict';

module.exports = function ($rootScope, $scope, $state, RestService, localStorageService) {

    $scope.formLogin = function () {
        RestService.post('login', $scope.user).then(function (response) {
            localStorageService.set('user', JSON.stringify(response.data));
            $state.go('playgrounds.map');
        });

    };

};