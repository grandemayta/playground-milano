'use strict';

module.exports = function ($scope, $state, RestService, DialogsService, localStorageService) {

    $scope.formResetPassword = function ($event) {
        $event.preventDefault();

        if ($scope.resetpasswordData.password === $scope.resetpasswordData.confirmpassword) {

            $scope.resetpasswordData.email = $state.params.email;

            RestService
                .post('resetpassword', $scope.resetpasswordData)
                .then(function (response) {
                    localStorageService.set('user', JSON.stringify(response.data));
                    $state.go('playgrounds.map');
                });

        }
        else DialogsService.alert('Cambia password', 'Le password devono essere uguali', 'Riprova', null);

    };

};