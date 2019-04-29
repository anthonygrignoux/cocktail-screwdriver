Static html/css/js boilerplate
==============

A boilerplate for compiling static pages with:

- CSS from [SASS (SCSS)](https://sass-lang.com/), 
- HTML from [Nunjucks](https://mozilla.github.io/nunjucks/), 
- Javascript bundles from node.js-style modules with [Browserify](http://browserify.org/)

It is an **opinionated** piece of code with choices made to satisfy the projects I have been working on.

It is also **pretty outdated** so you might try and find something more recent.

## Requirements

This boilerplate requires 2 dependencies installed globally:
  - nodejs 10.x or higher: download the package on https://nodejs.org
  - grunt-cli: npm install -g grunt-cli

[Yarn](https://yarnpkg.com) is recommended but it should work ok with [npm](https://www.npmjs.com/get-npm).

## Initialize the project

First of all, edit the package.json so that these informations are present and correct:
 - name
 - version
 - appDir: where your distribution files will be copied if you don't use the distribution files as is (default is www-app)

Use the following commands to install or update the boilerplate's components :

````
yarn install
````

OR

````
npm install
````

## Organization

**www-src** contains all the working files that you should add or modify.

By default (for the moment) Grunt will compile files in:

- **www-test** a directory meant for local debugging
  - assets, contains all our css/sass, js and images
  - datas contains json files that can be used to generate mock content
  - layout contains the pages' layouts with master.njk being the only file common to all
  - modules contains reusable pieces of the website
  - nunjucks contains reusable macros to generate content inside modules and pages
  - pages contains the web pages extending the layouts and including the modules. It should contain no html, only a declaration of the page's "dependencies"
- **www-dist** where all the files will me minified and ready for an eventual delivery
- specifically for this project it can also compile css, js and images files in an "app" directory

**Never work in www-test or www-dist, some tasks will erase their contents**

## Common tasks

**`grunt showme`** will launch two concurrent tasks that will optimize your workflow :
- `browserSync` will create a local server so that the pages can be debugged and viewed in a browser,
- each modification will trigger a reload of the page,
- `watch` will poll any changes in the working files and launch the necessary tasks automatically when files are added or modified.

**`grunt build:test`** will build the files in www-test.
It is also the first task you want to launch after etching the project so that you can view what you are working on.

Once the work is done you can compile the files for a static delivery with:

**`grunt build:dist`**

Or copy the files to the app with:

**`grunt build:app`**

### SVG sprite

While the `watch` task is active, simply drop icon svg into the following folder `/www-src/assets/icons/src/` to launch the generation of the sprite you can then include directly in a nunjucks page.

*Note*: see [Icon System with SVG Sprites
](https://css-tricks.com/svg-sprites-use-better-icon-fonts/) for more info about SVG sprites.

This task can be launched by hand with `grunt svgstore:sprite`

### Images

Any images dropped in