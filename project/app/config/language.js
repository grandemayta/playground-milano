'use strict';

module.exports = function (app) {

    app.config(['$translateProvider',
        function ($translateProvider) {

            $translateProvider
                .translations('en', require('../../languages/en'))
                .translations('it', require('../../languages/it'))
                .translations('es', require('../../languages/es'))
                .preferredLanguage('it');

            $translateProvider.useSanitizeValueStrategy('escaped');
        }
    ]);

};