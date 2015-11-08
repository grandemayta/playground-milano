'use strict';

module.exports = function (app) {

    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider

                //////////////////////////////////////////////
                /////////////////// HEADERS /////////////////
                ////////////////////////////////////////////
                .state('headerwithoutmenu', {
                    abstract: true,
                    template: require('../partials/headerwithoutmenu.html'),
                    controller: 'MenuController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.menu'});
                                deferred.resolve(require('../controllers/menu'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('headermenu', {
                    abstract: true,
                    template: require('../partials/headermenu.html'),
                    controller: 'MenuController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.menu'});
                                deferred.resolve(require('../controllers/menu'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //////////////////////////////////////////////
                //////////////// SPLASHSCREEN ///////////////
                ////////////////////////////////////////////
                .state('splashscreen', {
                    parent: 'headerwithoutmenu',
                    url: '/',
                    template: require('../views/splashscreen/splashscreen.html'),
                    controller: 'SplashscreenController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.splashscreen'});
                                deferred.resolve(require('../controllers/splashscreen'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //////////////////////////////////////////////
                //////////////////// ACCESS /////////////////
                ////////////////////////////////////////////
                .state('access', {
                    abstract: true,
                    parent: 'headerwithoutmenu',
                    template: '<div ui-view></div>',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.access'});
                                deferred.resolve(require('../controllers/access'));
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('access.social', {
                    parent: 'access',
                    url: '/entra',
                    template: require('../views/access/access.social.html'),
                    controller: 'LoginSocialController'
                })
                .state('access.login', {
                    parent: 'access',
                    url: '/login',
                    template: require('../views/access/access.login.html'),
                    controller: 'LoginController'
                })
                .state('access.registration', {
                    parent: 'access',
                    url: '/registrati',
                    template: require('../views/access/access.registration.html'),
                    controller: 'RegistrationController'
                })
                .state('access.generatecode', {
                    parent: 'access',
                    url: '/richiedicodice',
                    template: require('../views/access/access.generatecode.html'),
                    controller: 'GenerateCodeController'
                })
                .state('access.resetpassword', {
                    parent: 'access',
                    url: '/cambiapassword/:email',
                    template: require('../views/access/access.resetpassword.html'),
                    controller: 'ResetPasswordController'
                })

                ////////////////////////////////////////////
                ///////// PLAYGROUNDS LIST AND MAP ////////
                //////////////////////////////////////////
                .state('playgrounds', {
                    parent: 'headermenu',
                    template: '<ui-view></ui-view>',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.playgrounds'});
                                deferred.resolve(require('../controllers/playgrounds'));
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('playgrounds.map', {
                    parent: 'playgrounds',
                    url: '/campi-di-basket',
                    template: require('../views/playgrounds/playgrounds.map.html'),
                    controller: 'PlaygroundsMapController'
                })
                .state('playgrounds.list', {
                    parent: 'playgrounds',
                    url: '/lista-dei-campi',
                    backbutton: true,
                    template: require('../views/playgrounds/playgrounds.list.html'),
                    controller: 'PlaygroundsListController'
                })

                ////////////////////////////////////////////
                ///////////////// PLAYGROUND //////////////
                //////////////////////////////////////////
                .state('playground', {
                    parent: 'headermenu',
                    url: '/campo-di-basket/:id',
                    backbutton: true,
                    template: require('../views/playground/playground.tabs.html'),
                    controller: 'PlaygroundHomeController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.playground'});
                                deferred.resolve(require('../controllers/playground'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                ////////////////////////////////////////////
                /////////////////// CHECKIN ///////////////
                //////////////////////////////////////////
                .state('checkin', {
                    parent: 'headermenu',
                    url: '/checkin/:id/:idCheckin',
                    backbutton: true,
                    template: require('../views/checkin/checkin.html'),
                    controller: 'CheckinController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.checkin'});
                                deferred.resolve(require('../controllers/checkin'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //////////////////////////////////////////////
                /////////////////// FRIENDS /////////////////
                ////////////////////////////////////////////
                .state('friends', {
                    parent: 'headermenu',
                    url: '/amici',
                    backbutton: true,
                    template: require('../views/friends/friends.tabs.html'),
                    controller: 'FriendsController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.friends'});
                                deferred.resolve(require('../controllers/friends'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //////////////////////////////////////////////
                ////////////////// FAVOURITES ///////////////
                ////////////////////////////////////////////
                .state('favourites', {
                    parent: 'headermenu',
                    url: '/preferiti',
                    backbutton: true,
                    template: require('../views/favourites/favourites.html'),
                    controller: 'FavouritesController',
                    resolve: {
                        load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                            var deferred = $q.defer();
                            require.ensure([], function () {
                                $ocLazyLoad.load({name: 'app.favourites'});
                                deferred.resolve(require('../controllers/favourites'));
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //////////////////////////////////////////////
                /////////////////// FAQ//// /////////////////
                ////////////////////////////////////////////
                .state('faq', {
                    parent: 'headermenu',
                    template: '<ui-view></ui-view>'
                })
                .state('faq.home', {
                    parent: 'faq',
                    url: '/faq/home',
                    backbutton: true,
                    template: require('../views/faq/faq.home.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione',
                    template: require('../views/faq/faq.iscrizione.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.servizi', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi',
                    template: require('../views/faq/faq.servizi.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })

                //////////////////////////////////////////////
                //////////////// FAQ ISCRIZIONE /////////////
                ////////////////////////////////////////////
                .state('faq.iscrizione.comeiscriversi', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/come_iscriversi',
                    template: require('../views/faq/iscrizione/faq.iscrizione.comeiscriversi.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.pagamento', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/pagamento',
                    template: require('../views/faq/iscrizione/faq.iscrizione.pagamento.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.chisiscrive', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/chisiscrive',
                    template: require('../views/faq/iscrizione/faq.iscrizione.chisiscrive.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.cosaserve', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/cosaserve',
                    template: require('../views/faq/iscrizione/faq.iscrizione.cosaserve.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.conferma', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/conferma',
                    template: require('../views/faq/iscrizione/faq.iscrizione.conferma.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.cancellazione', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/cancellazione',
                    template: require('../views/faq/iscrizione/faq.iscrizione.cancellazione.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.iscrizione.accedi', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/iscrizione/accedi',
                    template: require('../views/faq/iscrizione/faq.iscrizione.accedi.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })

                ////////////////////////////////////////////
                ///////////////// SERVIZI /////////////////
                //////////////////////////////////////////
                .state('faq.servizi.qualiservizi', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi/qualiservizi',
                    template: require('../views/faq/servizi/faq.servizi.qualiservizi.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.servizi.obbligatoria', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi/obbligatoria',
                    template: require('../views/faq/servizi/faq.servizi.obbligatoria.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.servizi.fuorimilano', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi/fuorimilano',
                    template: require('../views/faq/servizi/faq.servizi.fuorimilano.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.servizi.segnalazione', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi/segnalazione',
                    template: require('../views/faq/servizi/faq.servizi.segnalazione.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })
                .state('faq.servizi.recensione', {
                    parent: 'faq',
                    backbutton: true,
                    url: '/faq/servizi/recensione',
                    template: require('../views/faq/servizi/faq.servizi.recensione.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Domande frequenti';
                    }
                })

                //////////////////////////////////////////////
                /////////////////// PRIVACY /////////////////
                ////////////////////////////////////////////
                .state('privacy', {
                    parent: 'headermenu',
                    url: '/privacy',
                    backbutton: true,
                    template: require('../views/privacy/privacy.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Privacy';
                    }
                })

                //////////////////////////////////////////////
                /////////////////// ABOUT /////////////////
                ////////////////////////////////////////////
                .state('about', {
                    parent: 'headermenu',
                    url: '/about',
                    backbutton: true,
                    template: require('../views/about/about.html'),
                    controller: function ($rootScope) {
                        $rootScope.pageTitle = 'Su di noi';
                    }
                })

                //////////////////////////////////////////////
                /////////////////// CREDITI /////////////////
                ////////////////////////////////////////////
                .state('credits', {
                    parent: 'headermenu',
                    url: '/crediti',
                    backbutton: true,
                    template: require('../views/credits/credits.html'),
                    controller: ['$rootScope', function ($rootScope) {
                        $rootScope.pageTitle = 'Crediti';
                    }]
                });

        }
    ]);

};
