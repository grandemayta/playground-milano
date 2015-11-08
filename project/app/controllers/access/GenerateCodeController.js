'use strict';

module.exports = function ($scope, $state, RestService) {

    $scope.formGenerateCode = function ($event) {
        $event.preventDefault();

        RestService
            .post('generatecode', $scope.generatecodeData)
            .then(function (response) {
                console.log(response);
                $state.go('access.resetpassword', {email: $scope.generatecodeData.email});
            });

    };

};