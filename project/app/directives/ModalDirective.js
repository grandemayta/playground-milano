'use strict';

module.exports = function (app) {

    app.directive('modal', ['$rootScope', '$state',
        function ($rootScope, $state) {
            return {
                restrict: 'E',
                transclude: true,
                template: '\
                <i ng-if="modalData.closeicon" ng-click="closeModal()" class="close-icon icon-close-empty"></i>\
                <div class="modal-body">\
                    <p ng-bind="modalData.text"></p>\
                    <button ng-if="modalData.closebutton" ng-click="closeModal()" class="default-btn btn-red">Chiudi</button>\
                    <button ng-if="modalData.goToPage"\
                            ng-click="goToPage(modalData.goToPage.state, modalData.goToPage.id)"\
                            ng-bind="modalData.goToPage.label"\
                            class="btn-playground">\
                    </button>\
                    <i ng-if="modalData.goToPage" class="button-icons modal-icon-playground icon-basketball"></i>\
                    <button ng-if="modalData.checkin"\
                            ng-click="goToPage(modalData.checkin.state, modalData.checkin.id)"\
                            ng-bind="modalData.checkin.label"\
                            class="btn-playground">\
                    </button>\
                    <i ng-if="modalData.checkin" class="button-icons icon-check-mark-3"></i>\
                    <button ng-if="modalData.navigate"\
                            ng-bind="modalData.navigate.label"\
                            class="btn-playground">\
                    </button>\
                    <i ng-if="modalData.navigate" class="button-icons icon-car"></i>\
                </div>',
                link: function (scope, element) {

                    scope.$watch('toggleModal', function (newVal) {
                        if (newVal) {
                            var modalHeight = document.querySelector('modal').clientHeight;
                            var modalPositionY = Math.floor(modalHeight / 2);
                            document.querySelector('modal').style.marginTop = -modalPositionY + 'px';
                        }
                    });

                    scope.goToPage = function (state, id) {
                        $state.go(state, {id: id});
                    };

                    scope.closeModal = function () {
                        $rootScope.disabledMenu = false;
                        $rootScope.toggleModal = false;
                    };
                }
            };

        }
    ]);

};