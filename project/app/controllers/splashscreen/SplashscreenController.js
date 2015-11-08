'use strict';

module.exports = function ($rootScope, $scope, $state, $interval) {

    $scope.count = 0;

    var interval = $interval(function () {
        ++$scope.count;
        document.querySelector('.loading-bar').style.width = $scope.count + '%';
    }, 50);

    $scope.$watch('count', function (newVal) {
        if (newVal != undefined && parseInt(newVal) === 100) {
            $interval.cancel(interval);
            $state.go($rootScope.IS_AUTH ? 'playgrounds.map' : 'access.social');
        }
    });

};