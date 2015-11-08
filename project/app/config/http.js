'use strict';

module.exports = function (app) {

    app.config(['$httpProvider',
        function ($httpProvider) {

            var interceptor = ['$q', '$rootScope',
                function ($q, $rootScope) {
                    return {
                        'request': function (config) {
                            $rootScope.toggleSpinner = true;

                            var PUBLIC_API = '*****';
                            var PRIVATE_API = '****';

                            if (config.url.indexOf('playgroundmilano.herokuapp.com') !== -1
                                || config.url.indexOf('localhost') !== -1) {

                                if (config.url.indexOf('login') !== -1
                                    || config.url.indexOf('registration') !== -1
                                    || config.url.indexOf('social') !== -1
                                    || config.url.indexOf('generatecode') !== -1
                                    || config.url.indexOf('resetpassword') !== -1
                                    || (config.url.indexOf('playgrounds') !== -1 && config.method === 'GET')
                                    || (config.url.indexOf('checkins') !== -1 && config.method === 'GET')
                                    || (config.url.indexOf('comments/playground') !== -1 && config.method === 'GET')) {

                                    config.headers.Authorization = PUBLIC_API;

                                }
                                else {

                                    config.headers.Authorization = PRIVATE_API;
                                    config.headers.token = $rootScope.userData.accesstoken;

                                }

                            }

                            return config;
                        },
                        'response': function (response) {
                            $rootScope.toggleSpinner = false;
                            return response;
                        },
                        'responseError': function (rejection) {
                            $rootScope.toggleSpinner = false;
                            return $q.reject(rejection);
                        }
                    };
                }];

            $httpProvider.interceptors.push(interceptor);
        }
    ]);

};