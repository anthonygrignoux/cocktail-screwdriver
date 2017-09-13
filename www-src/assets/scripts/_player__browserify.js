require('jquery');
require('plyr');

// video
var video = {
  init: function( settings ) {
    video.config = {
      selPlayer: '.c-plyr'
    };
    // Allow overriding the default config
    $.extend( video.config, settings );
    video.setup();
  },
  setup: function() {
    video.buildPlayer();
  },
  buildPlayer: function() {
    plyr.setup(video.config.selPlayer);
  },
  testConsole: function() {
    console.log('ok video');
  }
};

$(document).ready(video.init);
