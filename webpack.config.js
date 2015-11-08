var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log();

module.exports = {
    entry: {
        android: './project/app/bootstrap/app_android.js',
        ios: './project/app/bootstrap/app_ios.js'
    },
    output: {
        path: './project/public',
        filename: 'bundle_[name].js'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'html', exclude: /node_modules/},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css'), exclude: /node_modules/},
            {test: /\.(jpg|png|gif|eot|woff|ttf|svg|json)$/, loader: 'file', exclude: /node_modules/}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components', 'project'],
        alias: {
            'angular': 'angular/angular.js',
            'angular-ui-router': 'angular-ui-router/release/angular-ui-router.min.js',
            'angular-local-storage': 'angular-local-storage/dist/angular-local-storage.min.js',
            'angular-touch': 'angular-touch/angular-touch.min.js',
            'angular-translate': 'angular-translate/angular-translate.min.js',
            'ocLazyLoad': 'ocLazyLoad/dist/ocLazyLoad.min.js',
            'angular-i18n': 'angular-i18n/it-it.js',
            'ng-cordova-oauth': 'ng-cordova-oauth/dist/ng-cordova-oauth.min.js',
            'swiper': 'swiper/dist/js/swiper.min.js',
            'lodash': 'lodash/lodash.min.js',
            'js-marker-clusterer': 'lib/js-marker-clusterer.js',
            'spin': 'lib/spin.js',
            'css': 'css'
        }
    },
    plugins: [
        new ExtractTextPlugin('output.css'),
        new Webpack.ProvidePlugin({
            _: 'lodash',
            Spinner: 'spin',
            Swiper: 'swiper'
        })
    ]
};