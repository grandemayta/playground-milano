'use strict';

module.exports = function ($rootScope, $scope, $state, RestService, DialogsService) {

    $rootScope.pageTitle = "Fai Checkin";
    $scope.id_playground = $state.params.id;
    $scope.idCheckin = $state.params.idCheckin;

    $scope.dateFormat = "dd/MM/yyyy";
    $scope.dateFrom = new Date();
    $scope.minDate = new Date();
    $scope.hours = $scope.dateFrom.getHours();
    $scope.minutes = $scope.dateFrom.getMinutes();

    RestService.get('playgrounds/' + $scope.id_playground).then(function (response) {
        $scope.playground = response.data;
    });

    if ($scope.idCheckin) {
        RestService.get('checkin/' + $scope.idCheckin).then(function (response) {
            $scope.dateFrom = new Date(response.data.date_time_to_go);
            $scope.hours = $scope.dateFrom.getHours();
            $scope.minutes = $scope.dateFrom.getMinutes();
        });
    }

    $scope.getNumber = function (n) {
        return new Array(n);
    };

    $scope.openDatepicker = function () {
        $scope.opened = true;
    };

    $scope.checkinSelected = function ($event) {
        $event.preventDefault();
        var dateTimeSelected = $scope.dateFrom;
        dateTimeSelected.setHours(parseInt($scope.hours), parseInt($scope.minutes), 0, 0);

        if (angular.isDate(dateTimeSelected)) {

            if ($scope.idCheckin) {
                RestService
                    .put('checkins' + '/' + $scope.idCheckin, {date_time_to_go: dateTimeSelected})
                    .then(function (response) {
                        DialogsService.alert('Checkin', 'Checkin aggiornato', 'Continua', null);
                        $state.go('playground', {id: $scope.id_playground});
                    });
            }
            else {
                RestService
                    .post('checkins', {
                        id_user: $rootScope.userData.id,
                        id_playground: $scope.id_playground,
                        date_time_to_go: dateTimeSelected
                    })
                    .then(function (response) {
                        if (response['message']) alert(response.message);
                        else {
                            DialogsService.alert('Checkin', 'Checkin confermato', 'Continua', null);
                            $state.go('playground', {id: $scope.id_playground});
                        }
                    });
            }
        }
    };

};