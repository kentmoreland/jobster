module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: ['Gruntfile.js', 'public/js/**/*.js'],
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

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['eslint']);
};
