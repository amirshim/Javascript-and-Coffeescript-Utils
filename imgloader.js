/*
Cancelable Image Loader (uses jQuery 1.5 - might work with earlier versions)
Copyright 2011, Amir Shimoni
Released under the MIT License

Javascript file is generated from coffeescript
*/

var CancelableImageLoader;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
CancelableImageLoader = (function() {
  function CancelableImageLoader(emptySrc) {
    if (emptySrc == null) {
      emptySrc = '/empty.html';
    }
    this.isLoading = false;
    this.curSrc = null;
    this.myiframe = $("<iframe src=\"" + emptySrc + "\" style=\"display:none;\" />");
    this.myiframe.appendTo('body');
    this.myiframe.load(__bind(function() {
      var img_tag;
      this.myiframe.load = null;
      img_tag = $('<img/>');
      img_tag.appendTo(this.myiframe.contents().find('body'));
      this.iframe_img = img_tag.get(0);
      return img_tag.load(__bind(function() {
        if (!this.curSrc || this.iframe_img.src !== this.curSrc) {
          return;
        }
        this.isLoading = false;
        return this.curCb(this.iframe_img);
      }, this));
    }, this));
  }
  CancelableImageLoader.prototype.cancelRequest = function() {
    var cw;
    if (this.isLoading && this.iframe_img) {
      cw = this.myiframe[0].contentWindow;
      if (cw.stop) {
        cw.stop();
      } else {
        cw = this.myiframe[0].contentDocument;
        if (cw.execCommand) {
          cw.execCommand("Stop", false);
        }
      }
    }
    return this.isLoading = false;
  };
  CancelableImageLoader.prototype.load = function(src, completeCB) {
    var temp;
    if (!this.iframe_img) {
      temp = new Image();
      temp.onload = function() {
        return completeCB(temp);
      };
      temp.src = src;
      return;
    }
    this.curSrc = src;
    this.curCb = completeCB;
    if (this.iframe_img.src === src) {
      if (this.iframe_img.complete) {
        completeCB(this.iframe_img);
      }
      return;
    }
    this.cancelRequest();
    this.isLoading = true;
    return this.iframe_img.src = src;
  };
  return CancelableImageLoader;
})();