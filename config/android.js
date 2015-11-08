var app_data = require('./app_data.js');

module.exports = {

    remove_content: function(){
        return {
            remove_build_content: {command: 'rm -rf ' + app_data.paths.android},
            remove_www_content: {command: 'rm -rf ' + app_data.paths.android + '/www/*'},
            add_build_dir: {command: 'rm -rf ' + app_data.paths.android},
        };
    },

    copy: function() {
        return {
            css: {
                expand: true,
                flatten: true,
                src: app_data.paths.public + '/*.css',
                dest: app_data.paths.android + '/www'
            },
            fonts: {
                expand: true,
                flatten: true,
                src: [ 
                      app_data.paths.public + '/*.ttf', 
                      app_data.paths.public + '/*.woff', 
                      app_data.paths.public + '/*.eot', 
                      app_data.paths.public + '/*.svg'
                     ],
                dest: app_data.paths.android + '/www'
            },
            images: {
                expand: true,
                flatten: true,
                src: [
                        app_data.paths.public + '/*.png', 
                        app_data.paths.public + '/*.jpg', 
                        app_data.paths.public + '/*.gif'
                     ],
                dest: app_data.paths.android + '/www'
            },
            js: {
                expand: true,
                flatten: true,
                src: app_data.paths.public + '/*.js',
                dest: app_data.paths.android + '/www'
            },
            html: {
                expand: true,
                flatten: true,
                src: app_data.paths.public + '/index.html',
                dest: app_data.paths.android + '/www'
            },
            bundle: {
                src: app_data.paths.public + '/bundle_android.js',
                dest: app_data.paths.android + '/www/bundle.js'
            },
            icon_drawable_hdpi: {
                src:  app_data.paths.icons + '/android/drawable-hdpi/ic_launcher.png',
                dest: app_data.paths.platform + '/res/drawable-hdpi/icon.png'
            },
            icon_drawable_ldpi: {
                src:  app_data.paths.icons + '/android/drawable-ldpi/ic_launcher.png',
                dest: app_data.paths.platform + '/res/drawable-ldpi/icon.png'
            },
            icon_drawable_mdpi: {
                src:  app_data.paths.icons + '/android/drawable-mdpi/ic_launcher.png',
                dest: app_data.paths.platform + '/res/drawable-mdpi/icon.png'
            },
            icon_drawable_xhdpi: {
                src:  app_data.paths.icons + '/android/drawable-xhdpi/ic_launcher.png',
                dest: app_data.paths.platform + '/res/drawable-xhdpi/icon.png'
            },
            icon_drawable_xxhdpi: {
                src:  app_data.paths.icons + '/android/drawable-xxhdpi/ic_launcher.png',
                dest: app_data.paths.platform + '/res/drawable-xxhdpi/icon.png'
            }
        }
    },

    cordova_cli: function(){
        return {
                options: {
                    path: app_data.paths.android           
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
                        platforms: ['android']
                    }
                },
                add_plugins: {
                    options: {
                        command: 'plugin',
                        action: 'add',
                        plugins: [
                                    app_data.plugins.crosswalk,
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
                        platforms: ['android']
                    }
                },
                run: {
                    options: {
                        command: 'run',
                        platforms: ['android']
                    }
                },
                release: {
                    options: {
                        command: 'build',
                        platforms: ['android'],
                        args: ['--release']
                    }
                }
        };
    },

    cordova_config: function(){
        return {
            target: {
                options: {
                    id: app_data.app_id,
                    version: app_data.app_version.android,
                    name: app_data.app_name,
                    author: {
                        name: app_data.author.name,
                        email: app_data.author.email,
                        href: app_data.author.website
                    },
                    preferences: [
                        {name: 'Fullscreen', value: 'false'},
                        {name: 'Orientation', value: 'portrait'}
                    ]
                },
                dest: app_data.paths.android + '/config.xml'
            }
        };
    }

};