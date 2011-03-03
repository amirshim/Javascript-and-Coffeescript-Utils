###
Cancelable Image Loader (uses jQuery 1.5 - might work with earlier versions)
Copyright 2011, Amir Shimoni
Released under the MIT License

Javascript file is generated from coffeescript
###

class CancelableImageLoader
	constructor: (emptySrc = '/empty.html') ->
		@isLoading = false
		@curSrc = null
		@myiframe = $ """<iframe src="#{emptySrc}" style="display:none;" />""" # robots shoud be "empty.html"
		@myiframe.appendTo 'body'
		@myiframe.load =>
			@myiframe.load = null
			img_tag = $ '<img/>'
			img_tag.appendTo @myiframe.contents().find('body')
			@iframe_img = img_tag.get(0) # just want the dom element (not the jquery object)
			img_tag.load =>
				return if !@curSrc || @iframe_img.src != @curSrc
				@isLoading = false
				@curCb @iframe_img

	cancelRequest: ->
		if @isLoading and @iframe_img
			cw = @myiframe[0].contentWindow
			if cw.stop
				cw.stop()
			else
				cw = @myiframe[0].contentDocument
				if cw.execCommand
					cw.execCommand "Stop", false

		@isLoading = false

	load: (src, completeCB) ->
		if !@iframe_img # if we are called before we load the iframe, just do a one-off (not cancelable)
			temp = new Image()
			temp.onload = -> completeCB(temp)
			temp.src = src
			return

		@curSrc = src
		@curCb = completeCB

		# if we already have it loaded, just call the function...
		if @iframe_img.src == src
			if @iframe_img.complete
				completeCB(@iframe_img)
			# else we just wait for it to load...
			return
		
		@cancelRequest()
		@isLoading = true
		@iframe_img.src = src

