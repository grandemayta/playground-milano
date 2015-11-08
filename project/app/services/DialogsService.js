'use strict';

module.exports = function (app) {

    app.factory('DialogsService', ['$rootScope', '$window',
        function ($rootScope, $window) {

            return {
                alert: function (title, message, button, callback) {
                    if ($rootScope.env === 'DEV' || $rootScope.env === 'HEROKU') {
                        alert(message);
                        if (callback !== null) callback();
                    }
                    else {
                        if (callback !== null) navigator.notification.alert(message, callback(), title, button);
                        else navigator.notification.alert(message, null, title, button);
                    }
                },

                prompt: function (title, message, button_1, button_2, callback) {
                    if ($rootScope.env === 'DEV' || $rootScope.env === 'HEROKU') {
                        var status = $window.confirm(message);
                        if (status && callback !== null) callback();
                    }
                    else {
                        navigator
                            .notification
                            .confirm(message, function (confirmStatus) {
                                if (confirmStatus === 2) callback();
                            }, title, [button_1, button_2]);
                    }
                },

                toast: function (message, type, callback) {
                    /************************************
                     - short_top
                     - short_center
                     - short_bottom
                     - long_top
                     - long_center
                     - long_bottom
                     *************************************/

                    if ($rootScope.env === 'DEV' || $rootScope.env === 'HEROKU') {
                        alert(message);
                        if (callback !== null) callback();
                    }
                    else {
                        switch (type) {
                            case 'short_top':
                                $window.plugins.toast.showShortTop(message);
                                if (callback !== null) callback();
                                break;
                            case 'short_center':
                                $window.plugins.toast.showShortCenter(message);
                                if (callback !== null) callback();
                                break;
                            case 'short_bottom':
                                $window.plugins.toast.showShortBottom(message);
                                if (callback !== null) callback();
                                break;
                            case 'long_top':
                                $window.plugins.toast.showLongTop(message);
                                if (callback !== null) callback();
                                break;
                            case 'long_center':
                                $window.plugins.toast.showLongCenter(message);
                                if (callback !== null) callback();
                                break;
                            case 'long_bottom':
                                $window.plugins.toast.showLongBottom(message);
                                if (callback !== null) callback();
                                break;
                            default:
                                $window.plugins.toast.showShortBottom(message);
                                if (callback !== null) callback();

                        }
                    }

                }
            };
        }
    ]);

};