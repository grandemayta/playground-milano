module.exports = function (app) {
    require('./routes')(app);
    require('./run')(app);
    require('./http')(app);
    require('./language')(app);
};