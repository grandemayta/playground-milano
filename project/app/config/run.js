'use strict';

module.exports = function (app) {

    app.run(['$rootScope', '$state', 'localStorageService', 'COMPONENTS_VALUES',
        function ($rootScope, $state, localStorageService, COMPONENTS_VALUES) {

            $rootScope.$on('$stateChangeStart', function (event, toState) {

                $rootScope.userData = localStorageService.get('user');
                $rootScope.IS_AUTH = $rootScope.userData === null ? false : true;
                $rootScope.env = localStorageService.get('ENV') || 'PROD';
                $rootScope.currentPage = toState.name;
                $rootScope.toggleMenu = $rootScope.toggleSpinner = $rootScope.toggleModal = false;
                $rootScope.toggleBackButton = toState.backbutton ? true : false;
                $rootScope.language = 'it';
                delete $rootScope.pageTitle;
                $rootScope.DEVICE = COMPONENTS_VALUES;

                if (!$rootScope.IS_AUTH
                    && $rootScope.currentPage !== 'splashscreen'
                    && $rootScope.currentPage !== 'access.social'
                    && $rootScope.currentPage !== 'access.login'
                    && $rootScope.currentPage !== 'access.registration'
                    && $rootScope.currentPage !== 'access.generatecode'
                    && $rootScope.currentPage !== 'access.resetpassword'
                    && $rootScope.currentPage !== 'playgrounds.map'
                    && $rootScope.currentPage !== 'playgrounds.list'
                    && $rootScope.currentPage !== 'playground'
                    && $rootScope.currentPage !== 'about'
                    && $rootScope.currentPage !== 'privacy'
                    && $rootScope.currentPage !== 'credits'
                    && $rootScope.currentPage !== 'faq.home'
                        // FAQ ISCRIZIONE
                    && $rootScope.currentPage !== 'faq.iscrizione'
                    && $rootScope.currentPage !== 'faq.iscrizione.comeiscriversi'
                    && $rootScope.currentPage !== 'faq.iscrizione.pagamento'
                    && $rootScope.currentPage !== 'faq.iscrizione.chisiscrive'
                    && $rootScope.currentPage !== 'faq.iscrizione.cosaserve'
                    && $rootScope.currentPage !== 'faq.iscrizione.conferma'
                    && $rootScope.currentPage !== 'faq.iscrizione.cancellazione'
                    && $rootScope.currentPage !== 'faq.iscrizione.accedi'
                        // FAQ SERVIZI
                    && $rootScope.currentPage !== 'faq.servizi'
                    && $rootScope.currentPage !== 'faq.servizi.qualiservizi'
                    && $rootScope.currentPage !== 'faq.servizi.obbligatoria'
                    && $rootScope.currentPage !== 'faq.servizi.fuorimilano'
                    && $rootScope.currentPage !== 'faq.servizi.segnalazione'
                    && $rootScope.currentPage !== 'faq.servizi.recensione') {
                    event.preventDefault();
                }
                if ($rootScope.IS_AUTH
                    && ($rootScope.currentPage === 'splashscreen'
                    || $rootScope.currentPage === 'access.social'
                    || $rootScope.currentPage === 'access.login'
                    || $rootScope.currentPage === 'access.registration')) {
                    event.preventDefault();
                    $state.transitionTo('playgrounds.map');
                }


            });

            $rootScope.$on('$locationChangeSuccess', function () {
                // Code here :)
            });

        }
    ]);

};