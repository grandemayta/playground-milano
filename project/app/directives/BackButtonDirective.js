'use strict';

module.exports = function (app) {

    app.directive('backButton', ['$window',
        function ($window) {
            return {
                restrict: 'AE',
                link: function (scope, element) {
                    element.bind('click', function () {
                        $window.history.back();
                    });

                }
            };
        }
    ]);

};