CDOS Static boilerplate
==============

This project static integration works with Grunt and Bower to automatically generate files.
It is still a temporary work in progress and cannot be ported to another project without modification

## Initialize the project

First of all, edit the package.json so that these informations are present and correct:
 - name
 - version
 - appDir: where your distribution files will be copied if you don't use the distribution files as is (default is www-app)

Use the following commands to install or update the boilerplate's components :

    npm install
    bower install

## Organization

**www-src** contains all the working files that you should add or modify.

By default (for the moment) Grunt will compile files in:

- **www-test** a directory meant for local debugging
  - assets, contains all our css/sass, js and images
  - datas contains json files that can be used to generate content
  - layout contains the pages' layouts with master.html being the only file common to all
  - modules contains reusable pieces of the website
  - nunjucks contains reusable macros to generate content inside modules and pages
  - pages contains the web pages calling/extendin layouts and modules. It should contain no html
- **www-dist** where all the files will me minified and ready for an eventual delivery
- specifically for this project it can also compile css, js and images files in the wordpress themes directory

**Never work in www-test or www-dist, some tasks will erase their contents**

## Common tasks

**grunt build:test** will build the files in www-test.
It is also the first task you want to launch after etching the project so that you can view what you are working on.

**grunt showme** will launch two concurrent tasks that will optimize your workflow :
- browserSync will create a local server so that the pages can be debugged and viewed in a browser,
- each modification will trigger a reload of the page,
- "grunt-watch" will watch the working files and launch the necessary tasks automatically when files are added or modified.

Once the work is done you can compile the files for a static delivery with:

**grunt build:dist**

Or copy the files to Wordpress with:

**grunt build:app**

## Principles

TODO

## All the other tasks

TODO

## TODO

- maybe bower can be uninstalled and its library could be installed with npm only
