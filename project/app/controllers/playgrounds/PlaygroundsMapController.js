'use strict';

module.exports = function ($rootScope, $scope, $timeout, RestService) {

    $rootScope.pageTitle = 'Mappa dei campi';

    RestService.get('playgrounds').then(function (response) {
        $timeout(function () {
            $scope.playgrounds = response.data;
        }, 200);
    });

};