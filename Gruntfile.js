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
        } 
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // Load the bebel plugin
    grunt.loadNpmTasks('grunt-babel'); 

    // Default task(s).
    grunt.registerTask('default', ['babel', 'uglify']);
};

