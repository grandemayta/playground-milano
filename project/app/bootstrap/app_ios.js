require('../loader/loader');

var app = angular.module('app', [
        'oc.lazyLoad',
        'ui.router',
        'ngTouch',
        'LocalStorageModule',
        'ngLocale',
        'pascalprecht.translate',
        'ui.bootstrap'
    ]
);

app.constant({
    ENV: {
        DEV: 'https://playgroundmilano.herokuapp.com/api/v1',
        PROD: 'https://playgroundmilano.herokuapp.com/api/v1',
        HEROKU: 'http://localhost:5000/api/v1'
    }
});

/*CONFIG IOS */
app.constant('COMPONENTS_VALUES', {
    width: document.querySelector('html').clientWidth,
    height: document.querySelector('html').clientHeight,
    header: 70,
    tabs: 40,
    paddingTopHeader: 20,
    backbuttonAccess: 30,
    topMenu: 30,
    fixedBottom: 44,
    titleWidth: document.querySelector('html').clientWidth - 174,
    withHeader: document.querySelector('html').clientHeight - 70,
    withHeaderTab: document.querySelector('html').clientHeight - 110,
    withHeaderTabButton: document.querySelector('html').clientHeight - 154,
    withHeaderButton: document.querySelector('html').clientHeight - 114
});

require('../config')(app);
require('../services')(app);
require('../directives')(app);

angular.bootstrap(document.body, ['app']);