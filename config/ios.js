var app_data = require('./app_data.js');

module.exports = {

    remove_dir : function(){
        return {command: 'rm -rf ' + app_data.paths.ios + '/*'};
    },

    cordova_cli: function(){
        return {
                options: {
                    path: app_data.paths.ios
                },
                create: {
                    options: {
                        command: 'create',
                        id: app_data.app_id,
                        name: app_data.app_name
                    }
                },
                add_platform: {
                    options: {
                        command: 'platform',
                        action: 'add',
                        platforms: ['ios']
                    }
                },
                add_plugins: {
                    options: {
                        command: 'plugin',
                        action: 'add',
                        plugins: [
                                    app_data.plugins.statusbar,
                                    app_data.plugins.dialogs,
                                    app_data.plugins.geolocation,
                                    app_data.plugins.inappbrowser
                                 ]
                    }
                },
                build: {
                    options: {
                        command: 'build',
                        platforms: ['ios']
                    }
                }
        };
    },

    cordova_config: function(){
        return {
                options: {
                    id: app_data.app_id,
                    version: app_data.app_version.ios,
                    name: app_data.app_name,
                    preferences: [
                        {name: 'Fullscreen', value: 'false'},
                        {name: 'Orientation', value: 'portrait'}
                    ]
                },
                dest: app_data.paths.ios + '/config.xml'
            };
    }

};