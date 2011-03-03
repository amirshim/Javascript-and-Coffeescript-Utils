	$ ->
		load_next_link = $ '<a href="#">Load Next</a>'
		load_next_link.appendTo 'body'
		load_next_link.click ->
			load_next()
			false
		info_box = $ '<div/>'
		info_box.appendTo 'body'
		cnv = $ '<canvas width="600" height="600" />'
		cnv.appendTo 'body'
		ctx = cnv.get(0).getContext('2d')

		
		the_loader = new CancelableImageLoader '/robots.txt' # should not be robots, but works for jsfiddle
		load_list = null
		load_more_list = ->
			load_list = null
			$.ajax
				url: 'http://www.flickr.com/services/feeds/photos_public.gne?format=json'
				dataType: 'jsonp'
				jsonp: 'jsoncallback'
				success: (data) ->
					load_list = ([x.media.m, x.link] for x in data.items)
					load_next()

		load_next = ->
			return if load_list == null # it's currently loading...
			return load_more_list() if load_list.length == 0
			[media, link] = load_list.shift()
			info_box.empty().append """<a target="_blank" href="#{link}">#{link}</a>"""
			the_loader.load media, (img) ->
				cnv.get(0).width = 600 # clear canvas
				ctx.drawImage img, 0, 0

		load_more_list() # start it...

