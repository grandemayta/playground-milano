'use strict';

module.exports = function (app) {

    app.factory('GoogleMapInit', ['$window', '$q',
        function ($window, $q) {

            var CONFIG = {
                URL: 'https://maps.googleapis.com/maps/api/js',
                VERSION: 'v=3.exp',
                KEY: 'AIzaSyDcJMN_DMnXSur4fhXRupMZVuEDbC2Z2dk',
                SENSOR: false,
                CALLBACK: 'init'
            };

            var defer = $q.defer();

            function loadMapScript() {
                var script = document.createElement('script');
                script.src = CONFIG.URL + "?" + CONFIG.VERSION + "&key=" + CONFIG.KEY + "&sensor=" + CONFIG.SENSOR + "&callback=" + CONFIG.CALLBACK;
                document.body.appendChild(script);
            }

            $window.init = function () {
                defer.resolve();
            };

            loadMapScript();

            return defer.promise;
        }
    ]);

};

