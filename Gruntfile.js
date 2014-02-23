module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            views: {
                files: {
                    'server/views/index.dev.jade': 'server/views/index.sample.jade',
                    'server/views/index.jade': 'server/views/index.sample.jade'
                }
            }
        },
        bowerInstall: {
            server: {
                src: ['server/views/index.dev.jade']
            }
        },
        express: {
            dev: {
                options: {
                    port: 8080,
                    bases: [path.resolve(__dirname, 'public')],
                }
            }
        }
    });

    console.log(path.resolve(__dirname, 'public'));
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('serve', ['express:dev', 'express-keepalive']);
    grunt.registerTask('default', ['copy:views', 'bowerInstall']);
};
