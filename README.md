A repository for some random Javascript/Coffeescript code that others might find useful.

## Cancelable Image Loader (uses jQuery 1.5 - might work with earlier versions)
I needed a way to be able to [cancel html5 image loads](http://stackoverflow.com/questions/4926215/cancel-single-image-request-in-html5-browsers).  When replacing the the src attribute on an image, most browsers don't cancel a previous loading image.  This code, creates an iframe to load the image and can stop it by issueing a window.stop() in that iframe to cancel the image load.

To test it, fire up fiddler2, set it to simulate modem speeds and then using [this sample jsfiddle](http://jsfiddle.net/amirshim/6vL4N/) repeatedly click on "Load Next" quickly and watch the fiddler2 window to make sure the requests are being canceled.

The code is writen in coffee script, but a compiled javascript version is available here if you need it.

