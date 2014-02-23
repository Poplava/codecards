module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            app: {
                files: ['app/**/*.{js,css}'],
                tasks: ['build']
            },
            server: {
                files: ['server.js', 'server/**/*.*'],
                tasks: ['build', 'express:dev'],
                options: {
                    spawn: true
                }
            }
        },
        copy: {
            app: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.{js,css}'],
                    dest: 'dist/public/app'
                }]
            },
            server: {
                files: {
                    'server/views/index.dev.jade': 'server/views/index.sample.jade'
                }
            }
        },
        bowerInstall: {
            server: {
                ignorePath: 'dist',
                src: ['server/views/index.dev.jade']
            }
        },
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    port: 8080,
                    delay: 1000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('build', ['newer:copy', 'bowerInstall']);
    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
};
