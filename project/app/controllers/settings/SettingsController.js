'use strict';

module.exports = function ($rootScope) {

    var tabTitles = {settings_0: 'Lingua', settings_1: 'Sviluppatori'};
    $rootScope.pageTitle = tabTitles['settings_0'];

    $rootScope.$watch('currentTabPage', function (currentTabPage) {

        if (currentTabPage !== undefined) $rootScope.pageTitle = tabTitles[currentTabPage];
    });

};