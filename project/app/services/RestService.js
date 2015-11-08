'use strict';

module.exports = function (app) {

    app.factory('RestService', ['$http', '$q', '$rootScope', 'ENV', 'DialogsService',
        function ($http, $q, $rootScope, ENV, DialogsService) {

            var REST = ENV[$rootScope.env];

            var service = {};

            service.get = function (url) {
                var defer = $q.defer();

                $http.get(REST + '/' + url)
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', error.message, 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.post = function (url, params) {
                var defer = $q.defer();

                $http.post(REST + '/' + url, params)
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', error.message, 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.put = function (url, params) {
                var defer = $q.defer();

                $http.put(REST + '/' + url, params)
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', error.message, 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.remove = function (url) {
                var defer = $q.defer();

                $http.delete(REST + '/' + url)
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', error.message, 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.language = function (lang) {
                var defer = $q.defer();

                $http.get('languages/' + lang + '.json')
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', 'Opps qualcosa non ha funzionato!', 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.getProfileByFacebook = function (accessToken) {
                var defer = $q.defer();

                $http.get('https://graph.facebook.com/v2.3/me', {
                    params: {
                        access_token: accessToken,
                        fields: "id,first_name,last_name,email,picture",
                        type: "large",
                        format: "json"
                    }
                })
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', 'Opps qualcosa non ha funzionato!', 'Chiudi', null));
                    });

                return defer.promise;
            };

            service.getProfilePhotoFacebook = function (id) {

                var defer = $q.defer();

                $http.get('https://graph.facebook.com/' + id + '/picture?type=large&redirect=false')
                    .success(function (response) {
                        defer.resolve(response);
                    })
                    .error(function (error) {
                        defer.reject(DialogsService.alert('Errore info', 'Opps qualcosa non ha funzionato!', 'Chiudi', null));
                    });

                return defer.promise;
            };

            return service;
        }
    ]);

};

