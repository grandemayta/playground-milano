'use strict';

module.exports = function ($rootScope, $scope, $state, RestService) {

    var tabTitles = {friends_0: 'I miei amici', friends_1: 'Cerca amici'};
    $rootScope.$watch('currentTabPage', function (currentTabPage) {
        $rootScope.pageTitle = tabTitles[currentTabPage];
    });

    RestService.get('my-friends/' + $rootScope.userData.id).then(function (response) {
        $scope.myfriends = response.data;
    });

    $scope.searchFriends = function (idUser, value) {
        if (value.length >= 3) {
            RestService.get('search-users/' + idUser + '/' + value).then(function (response) {
                $scope.newFriends = response.data;
            });
        }
        else delete $scope.newFriends;
    };

    $scope.addFriend = function (idUser, friend, iconId) {
        RestService.post('friends', {id_user: idUser, id_friend: friend.id}).then(function (response) {
            document.querySelector('#' + iconId).innerHTML = '<i class="icon-check-mark-3"></i>';
            $scope.myfriends = response.data;
            $rootScope.toggleModal = true;
            $rootScope.modalData = {
                text: 'Amico aggiunto',
                closebutton: true
            };
        });
    };

    $scope.removeUser = function (idUser, idFriend) {
        RestService.remove('friends/' + idUser + '/' + idFriend).then(function (response) {
            $scope.myfriends = response.data;
            $rootScope.toggleModal = true;
            $rootScope.modalData = {
                text: 'Amico rimosso',
                closebutton: true
            };
        });
    };

    $scope.goToUser = function () {
        console.log("GO TO USER!");
    };

};