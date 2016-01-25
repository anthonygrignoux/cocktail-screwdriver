module.exports = function(grunt) {

  // time-grunt pour afficher le temps d'exécution des tâches
  require('time-grunt')(grunt);

  grunt.initConfig({
    // -------------------------------------------------------
    // grunt-sass
    sass: {
      test: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: {
          'www-test/assets/css/main.css': 'www-src/assets/sass/main.scss',
          'www-test/assets/css/oldie.css': 'www-src/assets/sass/oldie.scss'
        }
      },
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'www-dist/assets/css/main.css': 'www-src/assets/sass/main.scss',
          'www-dist/assets/css/oldie.css': 'www-src/assets/sass/oldie.scss'
        }
      }
    },
    // -------------------------------------------------------
    // grunt-sass-globbing
    sass_globbing: {
      all: {
        options: {
          signature: '// Modules'
        },
        files: {
          'www-src/assets/sass/_imported-modules.scss': 'www-src/modules/**/*.scss'
        }
      }
    },
    // -------------------------------------------------------
    // postcss (mainly for autoprefixer)
    postcss: {
      dist: {
        src: 'www-dist/**/*.css',
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              browsers: ['ie 8', '> 10%']
            })
          ]
        },
      },
      test: {
        src: 'www-test/**/*.css',      options: {
          map: true,
          processors: [
            require('autoprefixer')({
              browsers: ['ie 8', '> 10%']
            })
          ]
        },
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
        src: ['**/*.html'],
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
        src: ['**/*.html'],
        dest: 'www-test/pages/'
      }
    },
    // -------------------------------------------------------
    // grunt-prettify
    prettify: {
      options: {
        preserve_newlines: true
      },
      test: {
        expand: true,
        cwd: 'www-test/pages',
        ext: '.html',
        src: ['*.html'],
        dest: 'www-test/pages'
      }
    },
    // -------------------------------------------------------
    // grunt-merge-json
    'merge-json': {
      all: {
        files: [
          {
            src: ['www-src/modules/**/data.json','www-src/datas/src/**/*.json','www-src/pages/**/*.json'],
            dest: 'www-src/datas/dist/data.json'
          },
        ],
      }
    },
    // -------------------------------------------------------
    // grunt-nunjucks-2-html
    nunjucks: {
      test: {
        options: {
          data: grunt.file.readJSON('www-src/datas/dist/data.json'),
        },
        files: [
          {
            expand: true,
            cwd: "www-src/pages/",
            src: "*.html",
            dest: "www-test/pages/",
            ext: ".html"
          }
        ]
      },
      dist: {
        options: {
          data: grunt.file.readJSON('www-src/datas/dist/data.json'),
        },
        files: [
          {
            expand: true,
            cwd: "www-src/pages/",
            src: "*.html",
            dest: "www-dist/pages/",
            ext: ".html"
          }
        ]
      }
    },
    // -------------------------------------------------------
    // grunt-webpack
    webpack: {
      test: {
        // webpack options
        entry: './www-src/assets/scripts/main.js',
        output: {
          path: 'www-test/assets/scripts',
          filename: 'bundle.js',
        },
        stats: {
          // Configure the console output
          colors: false,
          modules: true,
          reasons: true
        },
      }
    },
    // -------------------------------------------------------
    // grunt-modernizr
    modernizr: {

      dist: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile' : 'www-src/assets/scripts/modernizr-dev.js',

        // Path to save out the built file.
        'outputFile' : 'www-src/assets/scripts/modernizr-dist.js',

        // Based on default settings on http://modernizr.com/download/
        'extra' : {
          'shiv' : true,
          'printshiv' : false,
          'load' : true,
          'mq' : false,
          'cssclasses' : true
        },

        // Based on default settings on http://modernizr.com/download/
        'extensibility' : {
          'addtest' : false,
          'prefixed' : false,
          'teststyles' : false,
          'testprops' : false,
          'testallprops' : false,
          'hasevents' : false,
          'prefixes' : false,
          'domprefixes' : false,
          'cssclassprefix': ''
        },

        // By default, source is uglified before saving
        'uglify' : true,

        // Define any tests you want to implicitly include.
        'tests' : [],

        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        'parseFiles' : true,

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a 'files' array below.
        // 'files' : {
        // 'src': []
        // },

        // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
        // 'handler': function (tests) {},

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        'matchCommunityTests' : false,

        // Have custom Modernizr tests? Add paths to their location here.
        'customTests' : []
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-nunjucks-2-html');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-merge-json');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask('generate-content', ['merge-json']);
  grunt.registerTask('sass-test', ['sass_globbing','sass:test']);
  grunt.registerTask('sass-dist', ['sass_globbing','sass:dist']);
  grunt.registerTask('build:test', ['nunjucks:test','sass-test']);
  grunt.registerTask('build:dist', ['nunjucks:dist','htmlmin:dist','sass-dist']);

  grunt.registerTask('default', ['build:test']);

};
