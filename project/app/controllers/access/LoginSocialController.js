'use strict';

module.exports = function ($rootScope, $scope, $state, OAuthService, RestService, localStorageService) {

    $scope.loginWithFacebook = function () {
        OAuthService
            .facebook("1448789398760191", ["email", "public_profile"])
            .then(function (tokenData) {
                loginTokenFacebook(tokenData.access_token);
            });
    };

    function loginTokenFacebook(accessToken) {

        RestService
            .getProfileByFacebook(accessToken)
            .then(function (accessData) {
                RestService
                    .getProfilePhotoFacebook(accessData.id)
                    .then(function (photo) {
                        var photoProfile = photo.data.url;
                        var user = {
                            firstname: accessData.first_name,
                            lastname: accessData.last_name,
                            email: accessData.email,
                            image: photoProfile,
                            access: 'facebook',
                            token: accessToken
                        };
                        makeAppLogin(user);
                    });
            });
    }

    function makeAppLogin(user) {
        RestService.post('social', user).then(function (response) {
            localStorageService.set('user', JSON.stringify(response.data));
            $state.go('playgrounds.map');
        });
    }

};