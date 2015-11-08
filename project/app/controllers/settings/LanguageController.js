'use strict';

module.exports = function ($rootScope, $scope, $translate) {

    $scope.changeLanguage = function (item) {
        $translate.use(item);
    };

};