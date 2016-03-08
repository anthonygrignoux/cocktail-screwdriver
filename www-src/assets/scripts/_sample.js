require('jquery');

// sampleScript
var sampleScript = {
  init: function( settings ) {
    sampleScript.config = {
      elSample: $('.mod-sample'),
      boolSample: true,
    };
    // Allow overriding the default config
    $.extend( sampleScript.config, settings );
    sampleScript.setup();
  },
  setup: function() {
    sampleScript.config.elSample.on('click', 'a', function(event) {
      sampleScript.testConsole();
    });
  },
  testConsole: function() {
    console.log('ok');
  }
};
$(document).ready(sampleScript.init);
