'use strict';

module.exports = function (app) {

    app.factory('OAuthService', ['$q', '$http',
        function ($q, $http) {

            return {

                google: function (clientId, appScope, options) {
                    var deferred = $q.defer();
                    if (window.cordova) {
                        var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                        if (cordovaMetadata.hasOwnProperty("cordova-plugin-inappbrowser") === true || cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                            var redirect_uri = "http://localhost/callback";
                            if (options !== undefined) {
                                if (options.hasOwnProperty("redirect_uri")) {
                                    redirect_uri = options.redirect_uri;
                                }
                            }
                            var browserRef = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&scope=' + appScope.join(" ") + '&approval_prompt=force&response_type=token', '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                            browserRef.addEventListener("loadstart", function (event) {
                                if ((event.url).indexOf(redirect_uri) === 0) {
                                    browserRef.removeEventListener("exit", function (event) {
                                    });
                                    browserRef.close();
                                    var callbackResponse = (event.url).split("#")[1];
                                    var responseParameters = (callbackResponse).split("&");
                                    var parameterMap = [];
                                    for (var i = 0; i < responseParameters.length; i++) {
                                        parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                    }
                                    if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                        deferred.resolve({
                                            access_token: parameterMap.access_token,
                                            token_type: parameterMap.token_type,
                                            expires_in: parameterMap.expires_in
                                        });
                                    } else {
                                        deferred.reject("Problem authenticating");
                                    }
                                }
                            });
                            browserRef.addEventListener('exit', function (event) {
                                deferred.reject("The sign in flow was canceled");
                            });
                        } else {
                            deferred.reject("Could not find InAppBrowser plugin");
                        }
                    } else {
                        deferred.reject("Cannot authenticate via a web browser");
                    }
                    return deferred.promise;
                },

                facebook: function (clientId, appScope, options) {
                    var deferred = $q.defer();
                    if (window.cordova) {
                        var cordovaMetadata = cordova.require("cordova/plugin_list").metadata;
                        if (cordovaMetadata.hasOwnProperty("cordova-plugin-inappbrowser") === true || cordovaMetadata.hasOwnProperty("org.apache.cordova.inappbrowser") === true) {
                            var redirect_uri = "http://localhost/callback";
                            if (options !== undefined) {
                                if (options.hasOwnProperty("redirect_uri")) {
                                    redirect_uri = options.redirect_uri;
                                }
                            }
                            var browserRef = window.open('https://www.facebook.com/v2.0/dialog/oauth?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&response_type=token&scope=' + appScope.join(","), '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
                            browserRef.addEventListener('loadstart', function (event) {
                                if ((event.url).indexOf(redirect_uri) === 0) {
                                    browserRef.removeEventListener("exit", function (event) {
                                    });
                                    browserRef.close();
                                    var callbackResponse = (event.url).split("#")[1];
                                    var responseParameters = (callbackResponse).split("&");
                                    var parameterMap = [];
                                    for (var i = 0; i < responseParameters.length; i++) {
                                        parameterMap[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                                    }
                                    if (parameterMap.access_token !== undefined && parameterMap.access_token !== null) {
                                        deferred.resolve({
                                            access_token: parameterMap.access_token,
                                            expires_in: parameterMap.expires_in
                                        });
                                    } else {
                                        deferred.reject("Problem authenticating");
                                    }
                                }
                            });
                            browserRef.addEventListener('exit', function (event) {
                                deferred.reject("The sign in flow was canceled");
                            });
                        } else {
                            deferred.reject("Could not find InAppBrowser plugin");
                        }
                    } else {
                        deferred.reject("Cannot authenticate via a web browser");
                    }
                    return deferred.promise;
                }

            };

        }
    ]);

};
