'use strict';

module.exports = function ($rootScope, $scope, $state, RestService, localStorageService, DialogsService) {

    $scope.formRegistration = function ($event) {
        $event.preventDefault();

        if ($scope.user.password === $scope.user.confirmpassword) {
            RestService
                .post('registration', $scope.user)
                .then(function (response) {
                    localStorageService.set('user', JSON.stringify(response.data));
                    $state.go('playgrounds.map');
                });
        }
        else DialogsService.alert('Registrazione', 'Le password devono essere uguali', 'Riprova', null);

    };

};