module.exports = function (app) {
    require('./BackButtonDirective')(app);
    require('./DefineAreaDirective')(app);
    require('./ModalDirective')(app);
    require('./GoogleMapDirective')(app);
    require('./TabsDirective')(app);
    require('./SpinnerDirective')(app);
    require('./LoadTemplatesDirectives')(app);
};