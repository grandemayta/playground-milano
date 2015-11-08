'use strict';

module.exports = function (app) {

    app.directive('tabs', ['$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            return {
                restrict: 'E',
                link: function (scope, element) {

                    element.ready(function () {
                        var tabPrev = 0;

                        $rootScope.currentTabPage = $rootScope.currentPage + '_' + 0;

                        var myTabs = new Swiper(element[0], {
                            speed: 400,
                            allowSwipeToPrev: false,
                            onSlideChangeStart: function (e) {
                                $timeout(function () {
                                    $rootScope.currentTabPage = $rootScope.currentPage + '_' + e.activeIndex;
                                }, 200);
                                document.querySelectorAll('#tabs-navigation li i')[tabPrev].classList.remove('active-tab');
                                document.querySelectorAll('#tabs-navigation li i')[e.activeIndex].classList.add('active-tab');
                                tabPrev = e.activeIndex;
                                this.allowSwipeToPrev = !e.isBeginning;
                                this.allowSwipeToNext = !e.isEnd;
                            }
                        });

                        scope.changeTab = function (tab) {
                            if (myTabs.activeIndex !== tab) myTabs._slideTo(tab);
                        };

                    });
                }
            };
        }
    ]);

};