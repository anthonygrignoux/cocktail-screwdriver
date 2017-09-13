require('jquery');
require('slick');

// slider
var slider = {
  init: function( settings ) {
    slider.config = {
      classActive: 'is-active',
      classSlider: 'c-slider--items'
    };
    // Allow overriding the default config
    $.extend( slider.config, settings );
    slider.setup();
  },
  setup: function() {
    // for IE10/11 we need to "refresh" the SVG everytime the slider changes
    var isIE10or11 = ('behavior' in document.documentElement.style && '-ms-user-select' in document.documentElement.style) || ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style);
    if (isIE10or11) {
      $('.' + slider.config.classSlider).on('init reInit breakpoint', function(){
        $(this).find('use').each(function(){
          var $svg = $(this);
          var svgHref = $svg.attr('xlink:href');
          $svg.attr('xlink:href', svgHref);
        });
      });
    }
    slider.addSlider($('.' + slider.config.classSlider));
  },
  addSlider: function(el) {
    el.slick({
      // deactivated
      dots: true,
      infinite: true,
      arrows: false,
      variableWidth: false,
      draggable: false,
      // activated
      adaptiveHeight: true,
      fade: true,
      // config
      slidesToShow: 1,
      slidesToScroll: 1
    });
  },
  destroySlider: function(el) {
    el.slick('unslick');
  },
  testConsole: function() {
    console.log('ok slider');
  }
};

$(document).ready(slider.init);
