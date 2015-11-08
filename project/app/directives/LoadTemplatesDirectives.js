'use strict';

module.exports = function (app) {

    app.directive('loadTemplate', function () {

        return {
            restrict: 'E',
            template: function (tElement, tAttrs) {

                var pathHtml = tAttrs.url;

                switch (pathHtml) {

                    /* PLAYGROUND */
                    case '../views/playground/playground.home.html':
                        return require('../views/playground/playground.home.html');
                    case '../views/playground/playground.checkins.html':
                        return require('../views/playground/playground.checkins.html');
                    case '../views/playground/playground.comments.html':
                        return require('../views/playground/playground.comments.html');

                    /* FRIENDS */
                    case '../views/friends/friends.myfriends.html':
                        return require('../views/friends/friends.myfriends.html');
                    case '../views/friends/friends.newfriends.html':
                        return require('../views/friends/friends.newfriends.html');

                }
            }
        };

    });

};