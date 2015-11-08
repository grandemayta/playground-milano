'use strict';

module.exports = function (app) {

    app.directive('defineArea', ['$rootScope',
        function ($rootScope) {
            return {
                restrict: 'A',
                scope: {
                    typeArea: '@'
                },
                link: function (scope, element) {

                    element.ready(function () {

                        if (scope.typeArea === 'paddingTopHeader') {
                            document
                                .querySelector('header')
                                .setAttribute('style',
                                'padding-top: ' + $rootScope.DEVICE.paddingTopHeader + 'px; height: ' + $rootScope.DEVICE.header + 'px;');
                            document.querySelector('.titleWidth').setAttribute('style', 'width:' + $rootScope.DEVICE.titleWidth + 'px;');
                            document.querySelector('.topMenu').setAttribute('style', 'top:' + $rootScope.DEVICE.topMenu + 'px;');

                        }
                        else if (scope.typeArea === 'backbuttonAccess') {
                            document.querySelector('.backbuttonAccess').setAttribute('style', 'margin-top:' + $rootScope.DEVICE.backbuttonAccess + 'px;');
                        }
                        else {
                            [].forEach.call(document.querySelectorAll('.' + scope.typeArea), function (item) {
                                item.setAttribute('style', 'height:' + $rootScope.DEVICE[scope.typeArea] + 'px;');
                            });
                        }

                    });
                }
            };
        }
    ]);

};