module.exports = function(grunt) {

  // time-grunt pour afficher le temps d'exécution des tâches
  require('time-grunt')(grunt);

  grunt.initConfig({
    // -------------------------------------------------------
    // grunt-zetzer
    zetzer: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
    },
    // -------------------------------------------------------
    // grunt-flats
    flats: {
      test: {
        options: {
          basePath: 'www-src/flats',
          layoutPath: 'pages',
          partialPath: 'modules',
          masterSrc: 'master/master.html',
          destPath: 'www-test/pages'
        }
      },
      dist: {
        options: {
          basePath: 'www-src/flats',
          layoutPath: 'pages',
          partialPath: 'modules',
          masterSrc: 'master/master.html',
          destPath: 'www-dist/pages'
        }
      }
    },
    // -------------------------------------------------------
    // grunt-sass
    sass: {
      test: {
        options: {
            sourceMap: true,
            outputStyle: 'expanded'
        },
        files: {
            'www-test/assets/css/main.css': 'www-src/assets/sass/main.scss'
        }          
      },
      dist: {
        options: {
            sourceMap: false,
            outputStyle: 'compressed'
        },
        files: {
            'www-dist/assets/css/main.css': 'www-src/assets/sass/main.scss'
        }          
      }
    },
    // -------------------------------------------------------
    // html-min
    htmlmin: {                                     
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true
        },                       
        expand: true,            
        cwd: 'www-dist/pages/',
        src: ['page.html'],
        dest: 'www-dist/pages/'
      },
      test: {                                      
        options: {                                 
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true
        },                       
        expand: true,            
        cwd: 'www-test/pages/',
        src: ['page.html'],
        dest: 'www-test/pages/'
      }
    },
    // -------------------------------------------------------
    // grunt-modernizr
    modernizr: {

      dist: {
          // [REQUIRED] Path to the build you're using for development.
          "devFile" : "lib/modernizr-dev.js",

          // Path to save out the built file.
          "outputFile" : "build/modernizr-custom.js",

          // Based on default settings on http://modernizr.com/download/
          "extra" : {
              "shiv" : true,
              "printshiv" : false,
              "load" : true,
              "mq" : false,
              "cssclasses" : true
          },

          // Based on default settings on http://modernizr.com/download/
          "extensibility" : {
              "addtest" : false,
              "prefixed" : false,
              "teststyles" : false,
              "testprops" : false,
              "testallprops" : false,
              "hasevents" : false,
              "prefixes" : false,
              "domprefixes" : false,
              "cssclassprefix": ""
          },

          // By default, source is uglified before saving
          "uglify" : true,

          // Define any tests you want to implicitly include.
          "tests" : [],

          // By default, this task will crawl your project for references to Modernizr tests.
          // Set to false to disable.
          "parseFiles" : true,

          // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
          // except files that are in node_modules/.
          // You can override this by defining a "files" array below.
          // "files" : {
              // "src": []
          // },

          // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
          // "handler": function (tests) {},

          // When parseFiles = true, matchCommunityTests = true will attempt to
          // match user-contributed tests.
          "matchCommunityTests" : false,

          // Have custom Modernizr tests? Add paths to their location here.
          "customTests" : []
      }

  }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-flats');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['flats:test']);

  grunt.registerTask('build:test', ['flats:test','sass:test']);  
  grunt.registerTask('build:dist', ['flats:dist','htmlmin:dist','sass:dist']);  

};