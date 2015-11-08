var devices   = require('./config/devices.js');


module.exports = function (grunt) {


    var device = grunt.option('device');
    var target = grunt.option('target');


    //GRUNT CONFIGUTATION
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /* grunt-exec */
        exec: devices[device].remove_content(),

        /* grunt-contrib-copy */
        copy: devices[device].copy(),

        /* grunt-cordova-cli */
        cordovacli: devices[device].cordova_cli(),

        /* grunt-cordova-config */
        cordova_config: devices[device].cordova_config()

    });

    
    /* GRUNT TASKS LIB */
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-cordova-config');
    grunt.loadNpmTasks('grunt-contrib-copy');


    /* GRUNT TASK COMMAND */
    grunt.registerTask('app', [
        'exec:remove_build_content',
        'exec:add_build_dir',
        'cordovacli:create',
        'cordovacli:add_platform',
        'cordovacli:add_plugins',
        'cordova_config:target',
        'exec:remove_www_content',
        'copy',
        'cordovacli:' + target
    ]);

};