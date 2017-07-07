module.exports = function(grunt) {

  // time-grunt pour afficher le temps d'exécution des tâches
  require('time-grunt')(grunt);

  // fetch package.json values
  var pkgJson = require('./package.json'),
      appDir = pkgJson.appDir;

  grunt.initConfig({
    // -------------------------------------------------------
    // grunt-sass
    sass: {
      test: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded',
          require: 'susy'
        },
        files: {
          'www-test/assets/css/main.css': 'www-src/assets/sass/main.scss',
          'www-test/assets/css/editor.css': 'www-src/assets/sass/editor.scss'
        }
      },
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          'www-dist/assets/css/main.css': 'www-src/assets/sass/main.scss',
          'www-dist/assets/css/editor.css': 'www-src/assets/sass/editor.scss'
        }
      }
    },
    // -------------------------------------------------------
    // postcss (mainly for autoprefixer)
    postcss: {
      test: {
        src: 'www-test/**/*.css',
				 options: {
          map: true,
          processors: [
            require('autoprefixer')({
              browsers: ['ie 8', 'last 10 versions']
            })
          ]
        },
      },
      dist: {
        src: 'www-dist/**/*.css',
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              browsers: ['ie 8', 'last 10 versions']
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
        cwd: 'www-dist/',
        src: ['**/*.html'],
        dest: 'www-dist/'
      },
      test: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true
        },
        expand: true,
        cwd: 'www-dist/',
        src: ['**/*.html'],
        dest: 'www-dist/'
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
            src: ['www-src/modules/**/mod-*.json','www-src/modules/**/data.json','www-src/datas/src/**/*.json','www-src/pages/**/*.json'],
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
            src: "*.njk",
            dest: "www-test/",
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
            src: "*.njk",
            dest: "www-dist/",
            ext: ".html"
          }
        ]
      }
    },
    // -------------------------------------------------------
    // grunt-svgstore
    svgstore: {
      options: {
        prefix : 'icon-',
        cleanup: false,
        svg: {
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      sprite: {
        files: {
          'www-src/assets/icons/sprite/sprite.svg': ['www-src/assets/icons/src/*.svg'],
        },
        options: {
          includedemo: true,
        }
      },
    },
    // -------------------------------------------------------
    // grunt-contrib-imagemin
    imagemin: {
      test: {
        files: [{
          expand: true,
          cwd: 'www-src/assets/',
          src: ['./**/*.{png,jpg,gif}'],
          dest: 'www-test/assets/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'www-src/assets/',
          src: ['./**/*.{png,jpg,gif}'],
          dest: 'www-dist/assets/'
        }]
      }
    },
    // -------------------------------------------------------
    // grunt-contrib-watch
    watch: {
      html: {
        files: ['www-src/**/*.html'],
        tasks: ['nunjucks:test'],
        options: {
          spawn: true,
        },
      },
      css: {
        files: ['www-src/assets/sass/**/*.scss','www-src/assets/sass/**/**/*.scss'],
        tasks: ['css-test'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['www-src/assets/scripts/**/*.js'],
        tasks: ['js-test'],
        options: {
          spawn: false,
        },
      },
      datas: {
        files: ['www-src/modules/**/mod-*.json','www-src/modules/**/data.json','www-src/datas/src/**/*.json','www-src/pages/**/*.json'],
        tasks: ['generate-content-test'],
        options: {
          spawn: true,
        },
      },
      svg: {
        files: ['www-src/assets/icons/src/**/*.svg'],
        tasks: ['svgstore:sprite','nunjucks:test'],
        options: {
          spawn: false,
        },
      },
      img: {
        files: ['www-src/assets/**/*.{png,jpg,gif}'],
        tasks: ['imagemin-new-test'],
        options: {
          spawn: true,
        },
      },
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      }
    },
    // -------------------------------------------------------
    // grunt-browser-sync
    browserSync: {
      test: {
        bsFiles: {
          src : ['www-test/assets/css/**/*.css','www-test/**/*.*']
        },
        options: {
          injectChanges: true,
          reloadDelay: 1000,
          server: {
            baseDir: "www-test/",
            directory: true
          }
        }
      }
    },
    // -------------------------------------------------------
    // grunt-contrib-uglify
    uglify: {
      test: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          'www-test/assets/scripts/bundle.js': 'www-src/assets/scripts/dist/bundle.js'
        }
      },
      dist: {
        files: {
          'www-dist/assets/scripts/bundle.js': 'www-src/assets/scripts/dist/bundle.js'
        }
      }
    },
    // -------------------------------------------------------
    // grunt-browserify
    browserify : {
      test: {
        files : { 'www-src/assets/scripts/dist/bundle.js' : ['www-src/assets/scripts/entry.js'] }
      },
      dist: {
        files : { 'www-src/assets/scripts/dist/bundle.js' : ['www-src/assets/scripts/entry.js'] }
      }
    },
    // -------------------------------------------------------
    // grunt-modernizr
    modernizr: {
      test: {
        'dest' : 'www-test/assets/scripts/modernizr.js',
        'devFile': 'www-src/assets/scripts/modernizr-dev.js',
        'parseFiles': true,
        'customTests': [],
        'tests': [
          'flexbox'
        ],
        'excludeTests': [
          'hidden'
        ],
        'options': [
          'setClasses',
        ],
        'uglify': true,
        'files' : {
          'src': [
            'www-src/assets/**/*.{js,css,scss}',
          ]
        }
      },
      dist: {
        'dest' : 'www-dist/assets/scripts/modernizr.js',
        'devFile': 'www-src/assets/scripts/modernizr-dev.js',
        'parseFiles': true,
        'customTests': [],
        'tests': [],
        'excludeTests': [
          'hidden'
        ],
        'options': [
          'setClasses'
        ],
        'uglify': true,
        'files' : {
          'src': [
            'www-src/assets/**/*.{js,css,scss}',
          ]
        }
      }
    },
    // grunt-bower-task
    bower: {
      install: {
      }
    },
    // grunt-sync
    sync: {
      app: {
        files: [{
          cwd: 'www-dist/assets/',
          src: [
            'backgrounds/**', // background images
            'css/**', // css
            'scripts/**', // js
            'fonts/**', // fonts
          ],
          dest: appDir + 'assets/',
        }],
        verbose: true,
        updateAndDelete: true
      },
      test: {
        files: [{
          cwd: 'www-src/assets/',
          src: [
            'illus/*.svg', // svg
            'fonts/**', // fonts
          ],
          dest: 'www-test/assets/',
        },{
          cwd: 'www-src/assets/favicons/',
          src: [
            '**'
          ],
          dest: 'www-test/',
        }],
        verbose: true
      },
      dist: {
        files: [{
          cwd: 'www-src/assets/',
          src: [
            'illus/*.svg', // svg
            'fonts/**', // fonts
          ],
          dest: 'www-dist/assets/',
        },{
          cwd: 'www-src/assets/favicons/',
          src: [
            '**'
          ],
          dest: 'www-dist/',
        }],
        verbose: true
      }
    },
    // grunt-contrib-clean
    clean: {
      test: ['www-test/*'],
      dist: ['www-dist/*']
    },
    // grunt-concurrent
    concurrent: {
      showme: {
        tasks: ['browserSync', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // --- Load plugins
  // styles
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  // html
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-nunjucks-2-html');
  grunt.loadNpmTasks('grunt-prettify');
  // content
  grunt.loadNpmTasks('grunt-merge-json');
  // js
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-modernizr");
  // tools
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');
  // images
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // --- Tasks
  // fetch and glob the content and regenerates html (test and dist)
  grunt.registerTask('generate-content-test', function() {
    grunt.task.run('svgstore:sprite');
    grunt.task.run('merge-json');
    grunt.task.run('nunjucks:test');
  });
  grunt.registerTask('generate-content-dist', function() {
    grunt.task.run('svgstore:sprite');
    grunt.task.run('merge-json');
    grunt.task.run('nunjucks:dist');
    grunt.task.run('htmlmin:dist');
  });
  // fetch and glob the sass files and generates css (test and dist)
  grunt.registerTask('css-test', function() {
    grunt.task.run('sass:test');
    grunt.task.run('postcss:test');
  });
  grunt.registerTask('css-dist', function() {
    grunt.task.run('sass:dist');
    grunt.task.run('postcss:dist');
  });
  // fetch and glob the sass files and generates css (test and dist)
  grunt.registerTask('js-test', function() {
    grunt.task.run('browserify:test');
    grunt.task.run('uglify:test');
  });
  grunt.registerTask('js-dist', function() {
    grunt.task.run('browserify:dist');
    grunt.task.run('uglify:dist');
  });
  // minify and copy newest images only (test and dist)
  grunt.registerTask('imagemin-new-test', ['newer:imagemin:test']);
  grunt.registerTask('imagemin-new-dist', ['newer:imagemin:dist']);
  // build the website
  grunt.registerTask('build:test', function() {
    grunt.task.run('clean:test');
    grunt.task.run('sync:test');
    grunt.task.run('generate-content-test');
    grunt.task.run('css-test');
    grunt.task.run('imagemin-new-test');
    grunt.task.run('js-test');
    grunt.task.run('modernizr:test');
  });
  grunt.registerTask('build:dist', function() {
    grunt.task.run('clean:dist');
    grunt.task.run('sync:dist');
    grunt.task.run('generate-content-dist');
    grunt.task.run('css-dist');
    grunt.task.run('imagemin-new-dist');
    grunt.task.run('js-dist');
    grunt.task.run('modernizr:dist');
  });
  // build the website
  grunt.registerTask('build:app', function() {
    grunt.task.run('build:dist');
    grunt.task.run('sync:app');
  });
  // Run browserSync and watch concurrently
  grunt.registerTask('showme', ['build:test','concurrent:showme']);
  // default
  grunt.registerTask('default', ['build:test']);

};
