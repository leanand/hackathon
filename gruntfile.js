module.exports = function(grunt) {
 
var settings_files= ['lib/backbone.js','lib/underscore.js','lib/jquery.js','lib/etch.js','lib/script.js'];

grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options:{
        separator: ';'
      },

      settingsjs: {
        src: [settings_files],
        dest: '../helpkit/public/javascripts/integrations/settings.js'
      }

    },

    build: {
      "options": {
        "default": "development"
      },
     
      "development": ["concat"],

      "staging"    : [ "clean","templateclient","requirejs", "concat", "compass:development", 
                      "s3:uploadstagejs", "s3:uploadstagecss", "cloudfront" ],

      "production" : [ "clean","templateclient","requirejs:agentminify", "concat", 
                      "compass:production", "uglify", "s3:uploadprodjs", "s3:uploadprodcss", "cloudfront" ]
    }
  });
 
  // Default task. Prepare for deploy. Use before commit.
  grunt.registerTask('default', 'build:development');
 
  // plugin tasks
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  
};