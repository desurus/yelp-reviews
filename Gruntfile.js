module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'static/build/<%= pkg.name %>.js',
                dest: 'static/build/<%= pkg.name %>.min.js'
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'static/build/<%= pkg.name %>.js': 'static/src/<%= pkg.name %>.js'
                }
            }
        },
        watch: {
            files: ['static/src/*.js'],
            tasks: ['default'],
            options: {
                spawn: false,
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the bebel plugin
    grunt.loadNpmTasks('grunt-babel');
    // Load the watch plugin
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['babel', 'uglify']);
};

