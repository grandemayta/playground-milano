'use strict';

module.exports = function (app) {

    require('js-marker-clusterer');

    app.directive('googleMap', ['$rootScope', 'GoogleMapInit', '$timeout',
        function ($rootScope, GoogleMapInit, $timeout) {

            return {
                restrict: 'E',
                scope: {
                    playgrounds: "="
                },
                template: '\
                <div id="google-map"></div>\
                <div ng-click="enableGeoLocalization()" class="search-geolocalization">\
                    <i class="fa icon-location"></i>\
                </div>\
                <div ui-sref="playgrounds.list" class="search-places">\
                    <i class="fa icon-keypad-2"></i>\
                </div>',
                link: function (scope, element) {

                    element.ready(function () {

                        var markers = [];

                        $timeout(function () {

                            scope.$watch('playgrounds', function (playgrounds) {
                                if (playgrounds !== undefined) {

                                    GoogleMapInit.then(function () {
                                        var places = playgrounds;

                                        var mapOptions = {
                                            zoom: 12,
                                            center: new google.maps.LatLng(45.46795, 9.18292),
                                            disableDefaultUI: true
                                        };

                                        var map = new google.maps.Map(document.querySelector('#google-map'), mapOptions);

                                        loadPlaces(map, places);
                                        var markerCluster = new MarkerClusterer(map, markers, {gridSize: 40});

                                        scope.enableGeoLocalization = function () {
                                            if (navigator && navigator.geolocation) {
                                                $rootScope.toggleSpinner = true;
                                                navigator
                                                    .geolocation
                                                    .getCurrentPosition(
                                                    function (response) {
                                                        console.log(response);
                                                        var currentPosition = {
                                                            position: new google.maps.LatLng(response.coords.latitude, response.coords.longitude),
                                                            title: 'Tu sei qui',
                                                            icon: require('../../images/current-position.png'),
                                                            id: 1111
                                                        };
                                                        mapOptions.center = new google.maps.LatLng(response.coords.latitude, response.coords.longitude);
                                                        map = new google.maps.Map(document.querySelector('#google-map'), mapOptions);
                                                        $timeout(function () {
                                                            loadPlaces(map, places, currentPosition);
                                                            $rootScope.toggleSpinner = false;
                                                        }, 200);
                                                    },
                                                    function (error) {
                                                        //Gestire errore
                                                        $timeout(function () {
                                                            $rootScope.toggleSpinner = false;
                                                        }, 200);
                                                    }
                                                );
                                            }
                                        };

                                    });

                                }
                            });

                        }, 200);

                        function loadPlaces(map, places, currentPosition) {
                            if (currentPosition) {
                                var showCurrentPosition = new google.maps.Marker(currentPosition);
                                showCurrentPosition.setMap(map);
                            }

                            for (var place in places) {
                                var marker = new google.maps.Marker({
                                    position: {
                                        lat: parseFloat(places[place].latitude),
                                        lng: parseFloat(places[place].longitude)
                                    },
                                    title: places[place].name,
                                    map: map,
                                    icon: require('../../images/basketball.png'),
                                    id: places[place].id
                                });

                                markers.push(marker);

                                google.maps.event.addListener(marker, 'click', function () {

                                    var placeData = this;

                                    $rootScope.$apply(function () {
                                        $rootScope.toggleModal = true;

                                        if ($rootScope.IS_AUTH) {
                                            $rootScope.modalData = {
                                                text: placeData.title,
                                                closeicon: true,
                                                goToPage: {
                                                    id: placeData.id,
                                                    state: 'playground',
                                                    label: 'Dettaglio del campo'
                                                },
                                                checkin: {
                                                    id: placeData.id,
                                                    state: 'checkin',
                                                    label: 'Fai check-in'
                                                }
                                                /*navigate: {
                                                 label: $rootScope.LANGUAGE.TOMTOM
                                                 }*/
                                            };
                                        }
                                        else {
                                            $rootScope.modalData = {
                                                text: placeData.title,
                                                closeicon: true,
                                                goToPage: {
                                                    id: placeData.id,
                                                    state: 'playground',
                                                    label: 'Dettaglio del campo'
                                                }
                                            };
                                        }
                                    });
                                });
                            }
                        }

                    });
                }
            };
        }
    ]);

};