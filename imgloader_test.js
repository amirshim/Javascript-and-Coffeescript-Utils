$(function() {
  var cnv, ctx, info_box, load_list, load_more_list, load_next, load_next_link, the_loader;
  load_next_link = $('<a href="#">Load Next</a>');
  load_next_link.appendTo('body');
  load_next_link.click(function() {
    load_next();
    return false;
  });
  info_box = $('<div/>');
  info_box.appendTo('body');
  cnv = $('<canvas width="600" height="600" />');
  cnv.appendTo('body');
  ctx = cnv.get(0).getContext('2d');
  the_loader = new CancelableImageLoader('/robots.txt');
  load_list = null;
  load_more_list = function() {
    load_list = null;
    return $.ajax({
      url: 'http://www.flickr.com/services/feeds/photos_public.gne?format=json',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function(data) {
        var x;
        load_list = (function() {
          var _i, _len, _ref, _results;
          _ref = data.items;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            _results.push([x.media.m, x.link]);
          }
          return _results;
        })();
        return load_next();
      }
    });
  };
  load_next = function() {
    var link, media, _ref;
    if (load_list === null) {
      return;
    }
    if (load_list.length === 0) {
      return load_more_list();
    }
    _ref = load_list.shift(), media = _ref[0], link = _ref[1];
    info_box.empty().append("<a target=\"_blank\" href=\"" + link + "\">" + link + "</a>");
    return the_loader.load(media, function(img) {
      cnv.get(0).width = 600;
      return ctx.drawImage(img, 0, 0);
    });
  };
  return load_more_list();
});