'use strict';

module.exports = function ($rootScope, $scope, $state, RestService) {

    var id_playground = $state.params.id;
    $scope.userComment = '';
    $scope.userHasComment = false;

    $scope.loadComments = function () {
        RestService.get('comments/playground/' + id_playground).then(function (response) {
            $scope.playgroundComments = response.data;
        });
    };

    if ($rootScope.IS_AUTH) {
        RestService.get('comments/' + $rootScope.userData.id + '/' + id_playground).then(function (response) {
            if (response['message']) $scope.userHasComment = false;
            else $scope.userHasComment = true;
        });
    }

    $scope.loadComments();

    $scope.toggleCommentPanel = function () {
        $scope.toggleCommentPanelStatus = ~$scope.toggleCommentPanelStatus;
    };

    $scope.commentToolbar = function (pos) {
        $scope.playgroundComments[pos].toolbarStatus = ~$scope.playgroundComments[pos].toolbarStatus;
    };

    $scope.editMyComment = function (id, actualComment, pos) {
        $scope.toggleCommentPanel();
        $scope.idComment = id;
        $scope.commentPosition = pos;
        $scope.userComment = actualComment;
    };

    $scope.removeMyComment = function (pos, idCommment) {
        RestService.remove('comments/' + idCommment).then(function () {
            $scope.playgroundComments.splice(pos, 1);
            $scope.userHasComment = false;
        });
    };

    $scope.saveUserComment = function (value) {
        var commentClean = String(value).replace(/<[^>]+>/gm, '');

        RestService.post('comments', {
            id_user: $rootScope.userData.id,
            id_playground: id_playground,
            comment: commentClean
        }).then(function (response) {
            $scope.toggleCommentPanel();
            $scope.loadComments();
            $scope.userHasComment = true;
        });
    };

    $scope.updateUserComment = function (userCommentUpdated) {
        var commentClean = String(userCommentUpdated).replace(/<[^>]+>/gm, '');

        RestService.put('comments', {
            id_comment: $scope.idComment,
            comment: commentClean
        }).then(function () {
            $scope.playgroundComments[$scope.commentPosition].comment = commentClean;
            $scope.toggleCommentPanel();
        });
    };

};