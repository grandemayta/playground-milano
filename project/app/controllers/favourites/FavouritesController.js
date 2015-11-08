'use strict';

module.exports = function ($rootScope, $scope, $state, RestService) {

    $rootScope.pageTitle = 'Campi preferiti';

    RestService.get('favourites/' + $rootScope.userData.id).then(function (response) {
        $scope.favourites = response.data;
    });

    $scope.goToPlayground = function (idPlayground) {
        $state.go('playground', {id: idPlayground});
    };

    $scope.goToCheckin = function (id) {
        $state.go('checkin', {id: id});
    };

    $scope.removePlayground = function (idUser, idPlayground, position) {
        RestService.remove('favourites/' + idUser + '/' + idPlayground).then(function (response) {
            if (response.message) $scope.favourites.splice(position, 1);
        });
    };

};