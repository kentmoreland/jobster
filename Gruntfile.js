module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'public/js/**/*.js'],
    },
    uglify: {
      build: {
        src: 'public/js/*.js',
        dest: 'public/dest/script.min.js',
      },
      dev: {
        options:{
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all',
        },
        src: 'public/js/*.js',
        dest: 'public/dest/script.min.js',
      }
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'public/*.js'],
        tasks: ['eslint'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['eslint', 'uglify:dev']);
};
