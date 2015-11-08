module.exports = {
    app_id: 'www.playgroundmilano.it',
    app_name: 'Playground Milano',
    description: '',
    author: {
        name: 'Molinari Dev Team',
        email: 'grandemayta@gmail.com',
        website: 'www.playground-milano.it'
    },
    app_version: {
                    android: '1.1.1',
                    ios:     '1.1.1'
                 },
    plugins: {
	            crosswalk:    'cordova-plugin-crosswalk-webview',
	            dialogs:      'cordova-plugin-dialogs',
	            statusbar:    'cordova-plugin-statusbar',
	            inappbrowser: 'cordova-plugin-inappbrowser',
	            geolocation:  'cordova-plugin-geolocation'
             },
    paths: {
    	project: 'project',
        public: 'project/public',
    	android: 'build_android',
    	ios: 'build_ios',
        platform: 'build_android/platforms/android',
        icons: 'icons'
    }
};