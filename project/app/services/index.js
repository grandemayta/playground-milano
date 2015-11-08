module.exports = function (app) {
    require('./RestService')(app);
    require('./GoogleMapInitService')(app);
    require('./OAuthService')(app);
    require('./DialogsService')(app);
};